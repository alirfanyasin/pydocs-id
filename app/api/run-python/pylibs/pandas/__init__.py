"""
Pure-Python compatible Pandas engine for PyDocs.id interactive execution sandbox.
Provides authentic Pandas Series and DataFrame behavior, table formatting,
loc/iloc indexing, boolean filtering, missing value handling (NaN),
groupby aggregation, concat/merge, and virtual CSV datasets for read_csv().
"""

import math
import csv
import io
import copy as _copy

__version__ = "2.2.0"

builtins_abs = __builtins__["abs"] if isinstance(__builtins__, dict) else getattr(__builtins__, "abs")
builtins_round = __builtins__["round"] if isinstance(__builtins__, dict) else getattr(__builtins__, "round")
builtins_min = __builtins__["min"] if isinstance(__builtins__, dict) else getattr(__builtins__, "min")
builtins_max = __builtins__["max"] if isinstance(__builtins__, dict) else getattr(__builtins__, "max")
builtins_sum = __builtins__["sum"] if isinstance(__builtins__, dict) else getattr(__builtins__, "sum")

nan = float("nan")
NA = float("nan")


def isna(val):
    if isinstance(val, (Series, DataFrame)):
        return val.isna()
    if val is None:
        return True
    if isinstance(val, float) and math.isnan(val):
        return True
    return False


isnull = isna


def notna(val):
    if isinstance(val, (Series, DataFrame)):
        return val.notna()
    return not isna(val)


notnull = notna


def _infer_series_dtype(values, explicit_dtype=None):
    if explicit_dtype is not None:
        if explicit_dtype in (int, "int", "int64"):
            return "int64"
        if explicit_dtype in (float, "float", "float64"):
            return "float64"
        if explicit_dtype in (bool, "bool"):
            return "bool"
        if explicit_dtype in (str, "str", "object"):
            return "object"
        return str(explicit_dtype)

    non_null = [v for v in values if not isna(v)]
    if not non_null:
        return "float64"

    has_null = len(non_null) < len(values)
    has_str = any(isinstance(v, str) for v in non_null)
    if has_str:
        return "object"

    all_bool = all(isinstance(v, bool) for v in non_null)
    if all_bool and not has_null:
        return "bool"

    all_num = all(isinstance(v, (int, float)) and not isinstance(v, bool) for v in non_null)
    if all_num:
        has_float = any(isinstance(v, float) for v in non_null)
        if has_float or has_null:
            return "float64"
        return "int64"

    return "object"


def _coerce_series_values(values, dt):
    out = []
    for v in values:
        if isna(v):
            out.append(float("nan") if dt == "float64" else None)
            continue
        if dt == "int64":
            out.append(int(float(v)))
        elif dt == "float64":
            out.append(float(v))
        elif dt == "bool":
            out.append(bool(v))
        else:
            out.append(v)
    return out


def _format_val(v, dt, float_decimals=None):
    if isna(v):
        return "NaN"
    if dt == "bool" or isinstance(v, bool):
        return "True" if v else "False"
    if dt == "int64" or (isinstance(v, int) and not isinstance(v, bool) and dt != "float64"):
        return str(int(v))
    if dt == "float64" or isinstance(v, float):
        fv = float(v)
        if float_decimals is not None:
            return f"{fv:.{float_decimals}f}"
        if builtins_abs(fv - builtins_round(fv)) < 1e-12:
            return f"{fv:.1f}"
        s = f"{fv:.6f}".rstrip("0")
        if s.endswith("."):
            s += "0"
        return s
    return str(v)


def _format_column_values(values, dt):
    if dt == "float64":
        non_null = [float(v) for v in values if not isna(v)]
        if non_null:
            # Check how many decimals are needed across the column
            max_dec = 1
            for fv in non_null:
                if builtins_abs(fv - builtins_round(fv)) < 1e-12:
                    dec = 1
                else:
                    s = f"{fv:.6f}".rstrip("0")
                    dec = len(s.split(".")[1]) if "." in s else 1
                if dec > max_dec:
                    max_dec = dec
            return ["NaN" if isna(v) else f"{float(v):.{max_dec}f}" for v in values]
    return [_format_val(v, dt) for v in values]


class Index:
    def __init__(self, data, dtype="object"):
        self._data = list(data)
        self.dtype = dtype

    def __len__(self):
        return len(self._data)

    def __iter__(self):
        return iter(self._data)

    def __getitem__(self, item):
        return self._data[item]

    def __eq__(self, other):
        if isinstance(other, Index):
            return self._data == other._data
        if isinstance(other, list):
            return self._data == other
        return False

    def tolist(self):
        return list(self._data)

    def __repr__(self):
        return f"Index({repr(self._data)}, dtype='{self.dtype}')"

    def __str__(self):
        return self.__repr__()


class _SeriesLocIndexer:
    def __init__(self, s):
        self._s = s

    def __getitem__(self, key):
        if isinstance(key, slice):
            start_idx = 0 if key.start is None else self._s._index.index(key.start)
            stop_idx = len(self._s) - 1 if key.stop is None else self._s._index.index(key.stop)
            step = key.step or 1
            idxs = range(start_idx, stop_idx + 1, step)
            return Series(
                [self._s._values[i] for i in idxs],
                index=[self._s._index[i] for i in idxs],
                name=self._s.name,
                dtype=self._s.dtype,
            )
        if isinstance(key, list):
            vals = []
            for k in key:
                pos = self._s._index.index(k)
                vals.append(self._s._values[pos])
            return Series(vals, index=key, name=self._s.name, dtype=self._s.dtype)
        if key not in self._s._index:
            raise KeyError(f"KeyError: {repr(key)}")
        pos = self._s._index.index(key)
        return self._s._values[pos]

    def __setitem__(self, key, value):
        if key in self._s._index:
            pos = self._s._index.index(key)
            self._s._values[pos] = value
            self._s.dtype = _infer_series_dtype(self._s._values)
            self._s._values = _coerce_series_values(self._s._values, self._s.dtype)


class _SeriesILocIndexer:
    def __init__(self, s):
        self._s = s

    def __getitem__(self, key):
        if isinstance(key, slice):
            return Series(
                self._s._values[key],
                index=self._s._index[key],
                name=self._s.name,
                dtype=self._s.dtype,
            )
        if isinstance(key, list):
            return Series(
                [self._s._values[i] for i in key],
                index=[self._s._index[i] for i in key],
                name=self._s.name,
                dtype=self._s.dtype,
            )
        return self._s._values[key]

    def __setitem__(self, key, value):
        self._s._values[key] = value
        self._s.dtype = _infer_series_dtype(self._s._values)
        self._s._values = _coerce_series_values(self._s._values, self._s.dtype)


class Series:
    def __init__(self, data=None, index=None, name=None, dtype=None):
        if isinstance(data, Series):
            vals = _copy.deepcopy(data._values)
            idx = list(index) if index is not None else list(data._index)
            nm = name if name is not None else data.name
            dt = dtype if dtype is not None else data.dtype
        elif isinstance(data, dict):
            if index is None:
                idx = list(data.keys())
                vals = [data[k] for k in idx]
            else:
                idx = list(index)
                vals = [data.get(k, float("nan")) for k in idx]
            nm = name
            dt = dtype
        elif hasattr(data, "tolist"):
            vals = list(data.tolist())
            idx = list(index) if index is not None else list(range(len(vals)))
            nm = name
            dt = dtype
        elif isinstance(data, (list, tuple, range)):
            vals = list(data)
            idx = list(index) if index is not None else list(range(len(vals)))
            nm = name
            dt = dtype
        elif data is None:
            vals = []
            idx = list(index) if index is not None else []
            nm = name
            dt = dtype
        else:
            # Scalar repeated along index
            idx = list(index) if index is not None else [0]
            vals = [data for _ in idx]
            nm = name
            dt = dtype

        if len(vals) != len(idx):
            raise ValueError(f"ValueError: Length of values ({len(vals)}) does not match length of index ({len(idx)})")

        self.dtype = _infer_series_dtype(vals, dt)
        self._values = _coerce_series_values(vals, self.dtype)
        self._index = idx
        self.name = nm

    @property
    def values(self):
        try:
            import numpy as np
            return np.array(self._values)
        except Exception:
            return list(self._values)

    @property
    def index(self):
        return list(self._index)

    @index.setter
    def index(self, new_idx):
        if len(new_idx) != len(self._values):
            raise ValueError("Length mismatch for index")
        self._index = list(new_idx)

    @property
    def shape(self):
        return (len(self._values),)

    @property
    def size(self):
        return len(self._values)

    @property
    def loc(self):
        return _SeriesLocIndexer(self)

    @property
    def iloc(self):
        return _SeriesILocIndexer(self)

    def __len__(self):
        return len(self._values)

    def __iter__(self):
        return iter(self._values)

    def tolist(self):
        return list(self._values)

    def copy(self):
        return Series(_copy.deepcopy(self._values), index=list(self._index), name=self.name, dtype=self.dtype)

    def astype(self, new_dtype):
        return Series(_copy.deepcopy(self._values), index=list(self._index), name=self.name, dtype=new_dtype)

    def head(self, n=5):
        return Series(self._values[:n], index=self._index[:n], name=self.name, dtype=self.dtype)

    def tail(self, n=5):
        return Series(self._values[-n:] if n > 0 else [], index=self._index[-n:] if n > 0 else [], name=self.name, dtype=self.dtype)

    def __getitem__(self, key):
        # Boolean Series or boolean list filtering
        if isinstance(key, Series) and key.dtype == "bool":
            vals = [v for v, m in zip(self._values, key._values) if m]
            idxs = [i for i, m in zip(self._index, key._values) if m]
            return Series(vals, index=idxs, name=self.name, dtype=self.dtype)
        if hasattr(key, "tolist") and not isinstance(key, Series):
            klist = key.tolist()
            if all(isinstance(x, bool) for x in klist):
                vals = [v for v, m in zip(self._values, klist) if m]
                idxs = [i for i, m in zip(self._index, klist) if m]
                return Series(vals, index=idxs, name=self.name, dtype=self.dtype)
        if isinstance(key, slice):
            return self.iloc[key]
        if key in self._index:
            return self.loc[key]
        if isinstance(key, int) and -len(self._values) <= key < len(self._values):
            return self._values[key]
        raise KeyError(f"KeyError: {repr(key)}")

    def __setitem__(self, key, value):
        if key in self._index:
            self.loc[key] = value
        elif isinstance(key, int):
            self.iloc[key] = value
        else:
            self._index.append(key)
            self._values.append(value)
            self.dtype = _infer_series_dtype(self._values)
            self._values = _coerce_series_values(self._values, self.dtype)

    def _binary_op(self, other, op, out_dtype=None):
        if isinstance(other, Series):
            vals = []
            for a, b in zip(self._values, other._values):
                if isna(a) or isna(b):
                    vals.append(False if out_dtype == "bool" else float("nan"))
                else:
                    vals.append(op(a, b))
            return Series(vals, index=list(self._index), name=self.name, dtype=out_dtype)
        else:
            vals = []
            for a in self._values:
                if isna(a) or isna(other):
                    vals.append(False if out_dtype == "bool" else float("nan"))
                else:
                    vals.append(op(a, other))
            return Series(vals, index=list(self._index), name=self.name, dtype=out_dtype)

    def __add__(self, other):
        return self._binary_op(other, lambda a, b: a + b)

    def __radd__(self, other):
        return self._binary_op(other, lambda a, b: b + a)

    def __sub__(self, other):
        return self._binary_op(other, lambda a, b: a - b)

    def __rsub__(self, other):
        return self._binary_op(other, lambda a, b: b - a)

    def __mul__(self, other):
        return self._binary_op(other, lambda a, b: a * b)

    def __rmul__(self, other):
        return self._binary_op(other, lambda a, b: b * a)

    def __truediv__(self, other):
        return self._binary_op(other, lambda a, b: float(a) / float(b))

    def __floordiv__(self, other):
        return self._binary_op(other, lambda a, b: a // b)

    def __mod__(self, other):
        return self._binary_op(other, lambda a, b: a % b)

    def __pow__(self, other):
        return self._binary_op(other, lambda a, b: a ** b)

    # Comparisons
    def __gt__(self, other):
        return self._binary_op(other, lambda a, b: bool(a > b), out_dtype="bool")

    def __ge__(self, other):
        return self._binary_op(other, lambda a, b: bool(a >= b), out_dtype="bool")

    def __lt__(self, other):
        return self._binary_op(other, lambda a, b: bool(a < b), out_dtype="bool")

    def __le__(self, other):
        return self._binary_op(other, lambda a, b: bool(a <= b), out_dtype="bool")

    def __eq__(self, other):
        return self._binary_op(other, lambda a, b: bool(a == b), out_dtype="bool")

    def __ne__(self, other):
        return self._binary_op(other, lambda a, b: bool(a != b), out_dtype="bool")

    # Logical bitwise operators
    def __and__(self, other):
        return self._binary_op(other, lambda a, b: bool(a) and bool(b), out_dtype="bool")

    def __or__(self, other):
        return self._binary_op(other, lambda a, b: bool(a) or bool(b), out_dtype="bool")

    def __invert__(self):
        return Series([not bool(x) for x in self._values], index=list(self._index), name=self.name, dtype="bool")

    # Filtering helper methods
    def isin(self, values):
        vset = set(values)
        return Series([v in vset for v in self._values], index=list(self._index), name=self.name, dtype="bool")

    def between(self, left, right, inclusive="both"):
        res = []
        for v in self._values:
            if isna(v):
                res.append(False)
            elif inclusive == "both":
                res.append(bool(left <= v <= right))
            elif inclusive == "neither":
                res.append(bool(left < v < right))
            elif inclusive == "left":
                res.append(bool(left <= v < right))
            elif inclusive == "right":
                res.append(bool(left < v <= right))
            else:
                res.append(bool(left <= v <= right))
        return Series(res, index=list(self._index), name=self.name, dtype="bool")

    # Missing value methods
    def isna(self):
        return Series([isna(v) for v in self._values], index=list(self._index), name=self.name, dtype="bool")

    def isnull(self):
        return self.isna()

    def notna(self):
        return Series([not isna(v) for v in self._values], index=list(self._index), name=self.name, dtype="bool")

    def notnull(self):
        return self.notna()

    def fillna(self, value):
        new_vals = [value if isna(v) else v for v in self._values]
        return Series(new_vals, index=list(self._index), name=self.name)

    def dropna(self):
        vals = [v for v in self._values if not isna(v)]
        idxs = [i for v, i in zip(self._values, self._index) if not isna(v)]
        return Series(vals, index=idxs, name=self.name)

    # Transformation methods
    def apply(self, func):
        new_vals = [func(v) for v in self._values]
        return Series(new_vals, index=list(self._index), name=self.name)

    def map(self, arg):
        if isinstance(arg, dict):
            new_vals = [arg.get(v, float("nan")) for v in self._values]
        elif callable(arg):
            new_vals = [arg(v) for v in self._values]
        else:
            raise TypeError("map requires a dict or callable")
        return Series(new_vals, index=list(self._index), name=self.name)

    def replace(self, to_replace, value=None):
        if isinstance(to_replace, dict):
            new_vals = [to_replace.get(v, v) for v in self._values]
        else:
            new_vals = [value if v == to_replace else v for v in self._values]
        return Series(new_vals, index=list(self._index), name=self.name)

    def round(self, decimals=0):
        new_vals = [
            v if isna(v) else (int(builtins_round(v)) if decimals == 0 and self.dtype == "int64" else builtins_round(float(v), decimals))
            for v in self._values
        ]
        return Series(new_vals, index=list(self._index), name=self.name, dtype=self.dtype)

    # Aggregations
    def count(self):
        return builtins_sum(1 for v in self._values if not isna(v))

    def sum(self):
        valid = [int(v) if isinstance(v, bool) else v for v in self._values if not isna(v)]
        if not valid:
            return 0
        res = builtins_sum(valid)
        return int(res) if self.dtype in ("int64", "bool") else float(res)

    def mean(self):
        valid = [float(v) for v in self._values if not isna(v)]
        if not valid:
            return float("nan")
        return builtins_sum(valid) / len(valid)

    def median(self):
        valid = sorted(float(v) for v in self._values if not isna(v))
        if not valid:
            return float("nan")
        n = len(valid)
        mid = n // 2
        if n % 2 == 1:
            return valid[mid]
        return (valid[mid - 1] + valid[mid]) / 2.0

    def min(self):
        valid = [v for v in self._values if not isna(v)]
        return builtins_min(valid) if valid else float("nan")

    def max(self):
        valid = [v for v in self._values if not isna(v)]
        return builtins_max(valid) if valid else float("nan")

    def std(self):
        valid = [float(v) for v in self._values if not isna(v)]
        if len(valid) <= 1:
            return float("nan")
        m = builtins_sum(valid) / len(valid)
        var = builtins_sum((x - m) ** 2 for x in valid) / (len(valid) - 1)
        return math.sqrt(var)

    def unique(self):
        seen = []
        for v in self._values:
            if v not in seen:
                seen.append(v)
        try:
            import numpy as np
            return np.array(seen)
        except Exception:
            return seen

    def nunique(self):
        seen = []
        for v in self._values:
            if not isna(v) and v not in seen:
                seen.append(v)
        return len(seen)

    def value_counts(self, ascending=False):
        counts = {}
        for v in self._values:
            if not isna(v):
                counts[v] = counts.get(v, 0) + 1
        items = sorted(counts.items(), key=lambda kv: kv[1], reverse=not ascending)
        return Series(
            [kv[1] for kv in items],
            index=[kv[0] for kv in items],
            name="count",
            dtype="int64",
        )

    def sort_values(self, ascending=True):
        pairs = list(zip(self._index, self._values))
        non_null = [(i, v) for i, v in pairs if not isna(v)]
        nulls = [(i, v) for i, v in pairs if isna(v)]
        non_null.sort(key=lambda kv: kv[1], reverse=not ascending)
        combined = non_null + nulls
        return Series(
            [kv[1] for kv in combined],
            index=[kv[0] for kv in combined],
            name=self.name,
            dtype=self.dtype,
        )

    def reset_index(self, drop=False):
        if drop:
            return Series(list(self._values), name=self.name, dtype=self.dtype)
        col_name = self.name if self.name is not None else 0
        return DataFrame({"index": list(self._index), col_name: list(self._values)})

    def agg(self, funcs):
        if isinstance(funcs, str):
            return getattr(self, funcs)()
        if isinstance(funcs, list):
            res_vals = [getattr(self, fn)() for fn in funcs]
            return Series(res_vals, index=funcs, name=self.name)
        raise TypeError("Unsupported agg specification")

    def __str__(self):
        if len(self._values) == 0:
            meta = f"Name: {self.name}, " if self.name is not None else ""
            return f"Series([], {meta}dtype: {self.dtype})"
        idx_strs = [str(i) for i in self._index]
        val_strs = _format_column_values(self._values, self.dtype)
        idx_w = builtins_max(len(s) for s in idx_strs)
        val_w = builtins_max(len(s) for s in val_strs)
        lines = []
        for i_s, v_s in zip(idx_strs, val_strs):
            lines.append(f"{i_s.ljust(idx_w)}    {v_s.rjust(val_w)}")
        if self.name is not None:
            lines.append(f"Name: {self.name}, dtype: {self.dtype}")
        else:
            lines.append(f"dtype: {self.dtype}")
        return "\n".join(lines)

    def __repr__(self):
        return self.__str__()


class _DataFrameLocIndexer:
    def __init__(self, df):
        self._df = df

    def __getitem__(self, key):
        if isinstance(key, tuple):
            row_key, col_key = key
        else:
            row_key, col_key = key, slice(None)

        # Resolve row positions
        if isinstance(row_key, Series) and row_key.dtype == "bool":
            row_positions = [pos for pos, flag in enumerate(row_key._values) if flag]
        elif isinstance(row_key, list) and all(isinstance(x, bool) for x in row_key):
            row_positions = [pos for pos, flag in enumerate(row_key) if flag]
        elif isinstance(row_key, slice):
            start_pos = 0 if row_key.start is None else self._df._index.index(row_key.start)
            stop_pos = len(self._df) - 1 if row_key.stop is None else self._df._index.index(row_key.stop)
            step = row_key.step or 1
            row_positions = list(range(start_pos, stop_pos + 1, step))
        elif isinstance(row_key, list):
            row_positions = [self._df._index.index(r) for r in row_key]
        else:
            if row_key not in self._df._index:
                raise KeyError(f"KeyError: {repr(row_key)}")
            single_row_pos = self._df._index.index(row_key)
            # Single row selected
            if isinstance(col_key, str) and col_key in self._df._columns:
                return self._df._data[col_key]._values[single_row_pos]
            if isinstance(col_key, slice):
                c_start = 0 if col_key.start is None else self._df._columns.index(col_key.start)
                c_stop = len(self._df._columns) - 1 if col_key.stop is None else self._df._columns.index(col_key.stop)
                cols = self._df._columns[c_start : c_stop + 1]
            elif isinstance(col_key, list):
                cols = col_key
            else:
                cols = list(self._df._columns)
            vals = [self._df._data[c]._values[single_row_pos] for c in cols]
            return Series(vals, index=cols, name=row_key)

        # Multiple rows selected; resolve columns
        if isinstance(col_key, str):
            s = self._df._data[col_key]
            return Series(
                [s._values[p] for p in row_positions],
                index=[self._df._index[p] for p in row_positions],
                name=col_key,
                dtype=s.dtype,
            )
        if isinstance(col_key, slice):
            c_start = 0 if col_key.start is None else self._df._columns.index(col_key.start)
            c_stop = len(self._df._columns) - 1 if col_key.stop is None else self._df._columns.index(col_key.stop)
            cols = self._df._columns[c_start : c_stop + 1]
        elif isinstance(col_key, list):
            cols = col_key
        else:
            cols = list(self._df._columns)

        new_data = {}
        for c in cols:
            s = self._df._data[c]
            new_data[c] = [s._values[p] for p in row_positions]
        new_index = [self._df._index[p] for p in row_positions]
        return DataFrame(new_data, index=new_index, columns=cols)

    def __setitem__(self, key, value):
        if isinstance(key, tuple):
            row_key, col_key = key
        else:
            row_key, col_key = key, slice(None)

        if isinstance(row_key, Series) and row_key.dtype == "bool":
            row_positions = [pos for pos, flag in enumerate(row_key._values) if flag]
        elif isinstance(row_key, slice):
            start_pos = 0 if row_key.start is None else self._df._index.index(row_key.start)
            stop_pos = len(self._df) - 1 if row_key.stop is None else self._df._index.index(row_key.stop)
            row_positions = list(range(start_pos, stop_pos + 1))
        elif isinstance(row_key, list):
            row_positions = [self._df._index.index(r) for r in row_key]
        else:
            row_positions = [self._df._index.index(row_key)]

        cols = [col_key] if isinstance(col_key, str) else (col_key if isinstance(col_key, list) else list(self._df._columns))
        for c in cols:
            s = self._df._data[c]
            for p in row_positions:
                s._values[p] = value
            s.dtype = _infer_series_dtype(s._values)
            s._values = _coerce_series_values(s._values, s.dtype)


class _DataFrameILocIndexer:
    def __init__(self, df):
        self._df = df

    def __getitem__(self, key):
        if isinstance(key, tuple):
            row_key, col_key = key
        else:
            row_key, col_key = key, slice(None)

        if isinstance(row_key, int):
            if row_key < 0:
                row_key += len(self._df)
            if isinstance(col_key, int):
                if col_key < 0:
                    col_key += len(self._df._columns)
                cname = self._df._columns[col_key]
                return self._df._data[cname]._values[row_key]
            elif isinstance(col_key, slice):
                cols = self._df._columns[col_key]
            elif isinstance(col_key, list):
                cols = [self._df._columns[i] for i in col_key]
            else:
                cols = list(self._df._columns)
            vals = [self._df._data[c]._values[row_key] for c in cols]
            return Series(vals, index=cols, name=self._df._index[row_key])

        if isinstance(row_key, slice):
            row_positions = list(range(*row_key.indices(len(self._df))))
        elif isinstance(row_key, list):
            row_positions = [r if r >= 0 else len(self._df) + r for r in row_key]
        else:
            raise IndexError("Invalid iloc row indexer")

        if isinstance(col_key, int):
            if col_key < 0:
                col_key += len(self._df._columns)
            cname = self._df._columns[col_key]
            s = self._df._data[cname]
            return Series(
                [s._values[p] for p in row_positions],
                index=[self._df._index[p] for p in row_positions],
                name=cname,
                dtype=s.dtype,
            )

        if isinstance(col_key, slice):
            cols = self._df._columns[col_key]
        elif isinstance(col_key, list):
            cols = [self._df._columns[i] for i in col_key]
        else:
            cols = list(self._df._columns)

        new_data = {}
        for c in cols:
            s = self._df._data[c]
            new_data[c] = [s._values[p] for p in row_positions]
        new_index = [self._df._index[p] for p in row_positions]
        return DataFrame(new_data, index=new_index, columns=cols)

    def __setitem__(self, key, value):
        if isinstance(key, tuple):
            row_key, col_key = key
        else:
            row_key, col_key = key, slice(None)

        row_positions = (
            [row_key if row_key >= 0 else len(self._df) + row_key]
            if isinstance(row_key, int)
            else list(range(*row_key.indices(len(self._df))))
        )
        cols = (
            [self._df._columns[col_key]]
            if isinstance(col_key, int)
            else self._df._columns[col_key]
        )
        for c in cols:
            s = self._df._data[c]
            for p in row_positions:
                s._values[p] = value
            s.dtype = _infer_series_dtype(s._values)
            s._values = _coerce_series_values(s._values, s.dtype)


class _GroupBySeries:
    def __init__(self, groups_dict, col_name, group_key):
        self._groups = groups_dict  # {key_val: Series}
        self._col_name = col_name
        self._group_key = group_key

    def _apply_agg(self, fn_name):
        keys = list(self._groups.keys())
        vals = [getattr(self._groups[k], fn_name)() for k in keys]
        return Series(vals, index=keys, name=self._col_name)

    def sum(self):
        return self._apply_agg("sum")

    def mean(self):
        return self._apply_agg("mean")

    def median(self):
        return self._apply_agg("median")

    def min(self):
        return self._apply_agg("min")

    def max(self):
        return self._apply_agg("max")

    def count(self):
        return self._apply_agg("count")

    def agg(self, funcs):
        if isinstance(funcs, str):
            return self._apply_agg(funcs)
        if isinstance(funcs, list):
            keys = list(self._groups.keys())
            data = {}
            for fn in funcs:
                data[fn] = [getattr(self._groups[k], fn)() for k in keys]
            return DataFrame(data, index=keys, columns=funcs)
        raise TypeError("Unsupported agg argument")


class _DataFrameGroupBy:
    def __init__(self, df, by):
        self._df = df
        self._by = by
        self._groups_pos = {}
        key_col = df._data[by]._values
        for pos, kval in enumerate(key_col):
            if not isna(kval):
                self._groups_pos.setdefault(kval, []).append(pos)

    def __getitem__(self, col):
        if isinstance(col, str):
            groups_series = {}
            s_orig = self._df._data[col]
            for kval, positions in self._groups_pos.items():
                groups_series[kval] = Series(
                    [s_orig._values[p] for p in positions],
                    name=col,
                    dtype=s_orig.dtype,
                )
            return _GroupBySeries(groups_series, col, self._by)
        raise KeyError(col)

    def _agg_numeric_cols(self, fn_name):
        keys = list(self._groups_pos.keys())
        data = {}
        for c in self._df._columns:
            if c == self._by:
                continue
            s_orig = self._df._data[c]
            if s_orig.dtype in ("int64", "float64", "bool") or fn_name == "count":
                col_vals = []
                for k in keys:
                    sub = Series([s_orig._values[p] for p in self._groups_pos[k]], dtype=s_orig.dtype)
                    col_vals.append(getattr(sub, fn_name)())
                data[c] = col_vals
        return DataFrame(data, index=keys)

    def sum(self):
        return self._agg_numeric_cols("sum")

    def mean(self):
        return self._agg_numeric_cols("mean")

    def min(self):
        return self._agg_numeric_cols("min")

    def max(self):
        return self._agg_numeric_cols("max")

    def count(self):
        return self._agg_numeric_cols("count")

    def agg(self, spec):
        if isinstance(spec, dict):
            keys = list(self._groups_pos.keys())
            data = {}
            for col, fn in spec.items():
                grp_s = self[col]
                if isinstance(fn, str):
                    data[col] = getattr(grp_s, fn)()._values
            return DataFrame(data, index=keys)
        raise TypeError("Unsupported agg specification")


class DataFrame:
    def __init__(self, data=None, index=None, columns=None):
        self._columns = []
        self._data = {}
        self._index = []

        if data is None:
            if columns is not None:
                self._columns = list(columns)
                self._index = list(index) if index is not None else []
                for c in self._columns:
                    self._data[c] = Series([], index=self._index, name=c)
            return

        if isinstance(data, DataFrame):
            self._columns = list(columns) if columns is not None else list(data._columns)
            self._index = list(index) if index is not None else list(data._index)
            for c in self._columns:
                self._data[c] = data._data[c].copy()
            return

        if isinstance(data, dict):
            cols = list(columns) if columns is not None else list(data.keys())
            self._columns = cols
            n_rows = 0
            for c in cols:
                v = data.get(c, [])
                if isinstance(v, (list, tuple, Series)) or hasattr(v, "__len__") and not isinstance(v, str):
                    n_rows = len(v)
                    break
            self._index = list(index) if index is not None else list(range(n_rows))
            for c in cols:
                raw_col = data.get(c, [float("nan")] * len(self._index))
                if isinstance(raw_col, Series):
                    vals = list(raw_col._values)
                elif isinstance(raw_col, (list, tuple)) or hasattr(raw_col, "tolist"):
                    vals = list(raw_col.tolist() if hasattr(raw_col, "tolist") else raw_col)
                else:
                    vals = [raw_col] * len(self._index)
                self._data[c] = Series(vals, index=list(self._index), name=c)
            return

        if hasattr(data, "tolist") and not isinstance(data, (list, tuple)):
            data = data.tolist()

        if isinstance(data, list):
            if len(data) == 0:
                self._columns = list(columns) if columns is not None else []
                self._index = list(index) if index is not None else []
                for c in self._columns:
                    self._data[c] = Series([], index=[], name=c)
                return

            # List of dicts
            if isinstance(data[0], dict):
                if columns is not None:
                    cols = list(columns)
                else:
                    cols = []
                    for row in data:
                        for k in row.keys():
                            if k not in cols:
                                cols.append(k)
                self._columns = cols
                self._index = list(index) if index is not None else list(range(len(data)))
                for c in cols:
                    vals = [row.get(c, float("nan")) for row in data]
                    self._data[c] = Series(vals, index=list(self._index), name=c)
                return

            # 2D list of rows
            if isinstance(data[0], (list, tuple)):
                n_cols = len(data[0])
                cols = list(columns) if columns is not None else list(range(n_cols))
                self._columns = cols
                self._index = list(index) if index is not None else list(range(len(data)))
                for c_idx, c in enumerate(cols):
                    vals = [row[c_idx] for row in data]
                    self._data[c] = Series(vals, index=list(self._index), name=c)
                return

    @property
    def shape(self):
        return (len(self._index), len(self._columns))

    @property
    def size(self):
        return len(self._index) * len(self._columns)

    @property
    def ndim(self):
        return 2

    @property
    def columns(self):
        return Index(self._columns)

    @columns.setter
    def columns(self, new_cols):
        new_cols = list(new_cols)
        if len(new_cols) != len(self._columns):
            raise ValueError("Length mismatch for columns")
        new_data = {}
        for old_c, new_c in zip(self._columns, new_cols):
            s = self._data[old_c]
            s.name = new_c
            new_data[new_c] = s
        self._columns = new_cols
        self._data = new_data

    @property
    def index(self):
        return list(self._index)

    @index.setter
    def index(self, new_idx):
        new_idx = list(new_idx)
        if len(new_idx) != len(self._index):
            raise ValueError("Length mismatch for index")
        self._index = new_idx
        for c in self._columns:
            self._data[c]._index = list(new_idx)

    @property
    def dtypes(self):
        return Series(
            [self._data[c].dtype for c in self._columns],
            index=list(self._columns),
            dtype="object",
        )

    @property
    def values(self):
        rows = [
            [self._data[c]._values[r] for c in self._columns]
            for r in range(len(self._index))
        ]
        try:
            import numpy as np
            return np.array(rows)
        except Exception:
            return rows

    @property
    def loc(self):
        return _DataFrameLocIndexer(self)

    @property
    def iloc(self):
        return _DataFrameILocIndexer(self)

    def __len__(self):
        return len(self._index)

    def copy(self):
        return DataFrame(self)

    def head(self, n=5):
        return self.iloc[:n]

    def tail(self, n=5):
        if n <= 0:
            return self.iloc[0:0]
        start = builtins_max(0, len(self._index) - n)
        return self.iloc[start:]

    def __getitem__(self, key):
        # Single column name -> returns Series
        if isinstance(key, str):
            if key not in self._data:
                raise KeyError(f"KeyError: '{key}'")
            return self._data[key]

        # Boolean Series filtering -> returns filtered DataFrame
        if isinstance(key, Series) and key.dtype == "bool":
            positions = [pos for pos, flag in enumerate(key._values) if flag]
            return self.iloc[positions]

        # List of column names -> returns DataFrame
        if isinstance(key, list):
            if len(key) > 0 and all(isinstance(x, bool) for x in key):
                positions = [pos for pos, flag in enumerate(key) if flag]
                return self.iloc[positions]
            for c in key:
                if c not in self._data:
                    raise KeyError(f"KeyError: '{c}'")
            new_data = {c: self._data[c].copy() for c in key}
            return DataFrame(new_data, index=list(self._index), columns=key)

        if isinstance(key, slice):
            return self.iloc[key]

        raise KeyError(f"KeyError: {repr(key)}")

    def __setitem__(self, key, value):
        if isinstance(key, str):
            if isinstance(value, Series):
                vals = list(value._values)
            elif hasattr(value, "tolist") and not isinstance(value, (list, tuple, str)):
                vals = list(value.tolist())
            elif isinstance(value, (list, tuple)):
                vals = list(value)
            else:
                vals = [value] * len(self._index)

            if len(vals) != len(self._index):
                raise ValueError(f"Length of values ({len(vals)}) does not match length of index ({len(self._index)})")

            if key not in self._columns:
                self._columns.append(key)
            self._data[key] = Series(vals, index=list(self._index), name=key)
            return
        raise KeyError(f"Unsupported assignment key: {repr(key)}")

    # Missing value methods
    def isna(self):
        new_data = {c: self._data[c].isna() for c in self._columns}
        return DataFrame(new_data, index=list(self._index), columns=list(self._columns))

    def isnull(self):
        return self.isna()

    def notna(self):
        new_data = {c: self._data[c].notna() for c in self._columns}
        return DataFrame(new_data, index=list(self._index), columns=list(self._columns))

    def notnull(self):
        return self.notna()

    def dropna(self, subset=None, axis=0):
        check_cols = list(subset) if subset is not None else list(self._columns)
        keep_positions = []
        for r in range(len(self._index)):
            has_na = any(isna(self._data[c]._values[r]) for c in check_cols)
            if not has_na:
                keep_positions.append(r)
        return self.iloc[keep_positions]

    def fillna(self, value):
        new_data = {}
        if isinstance(value, dict):
            for c in self._columns:
                if c in value:
                    new_data[c] = self._data[c].fillna(value[c])
                else:
                    new_data[c] = self._data[c].copy()
        else:
            for c in self._columns:
                new_data[c] = self._data[c].fillna(value)
        return DataFrame(new_data, index=list(self._index), columns=list(self._columns))

    def drop_duplicates(self, subset=None, keep="first"):
        check_cols = list(subset) if subset is not None else list(self._columns)
        seen = set()
        keep_positions = []
        indices = range(len(self._index)) if keep != "last" else reversed(range(len(self._index)))
        for r in indices:
            row_tuple = tuple(
                "__NAN__" if isna(self._data[c]._values[r]) else self._data[c]._values[r]
                for c in check_cols
            )
            if row_tuple not in seen:
                seen.add(row_tuple)
                keep_positions.append(r)
        if keep == "last":
            keep_positions.reverse()
        return self.iloc[keep_positions]

    def drop(self, labels=None, axis=0, columns=None, index=None):
        if columns is not None or axis == 1:
            to_drop = columns if columns is not None else labels
            if isinstance(to_drop, str):
                to_drop = [to_drop]
            rem_cols = [c for c in self._columns if c not in to_drop]
            return self[rem_cols]
        else:
            to_drop = index if index is not None else labels
            if not isinstance(to_drop, list):
                to_drop = [to_drop]
            keep_pos = [p for p, idx_val in enumerate(self._index) if idx_val not in to_drop]
            return self.iloc[keep_pos]

    def rename(self, columns=None, index=None):
        df_copy = self.copy()
        if columns is not None:
            new_cols = [columns.get(c, c) for c in df_copy._columns]
            df_copy.columns = new_cols
        if index is not None:
            new_idx = [index.get(i, i) for i in df_copy._index]
            df_copy.index = new_idx
        return df_copy

    def sort_values(self, by, ascending=True):
        if isinstance(by, str):
            s = self._data[by]
            pairs = list(enumerate(s._values))
            non_null = [(pos, val) for pos, val in pairs if not isna(val)]
            nulls = [(pos, val) for pos, val in pairs if isna(val)]
            non_null.sort(key=lambda kv: kv[1], reverse=not ascending)
            positions = [pos for pos, _ in non_null] + [pos for pos, _ in nulls]
            return self.iloc[positions]
        elif isinstance(by, list):
            positions = list(range(len(self._index)))
            if isinstance(ascending, bool):
                asc_list = [ascending] * len(by)
            else:
                asc_list = list(ascending)
            for col, asc in reversed(list(zip(by, asc_list))):
                s = self._data[col]
                positions.sort(key=lambda p: s._values[p], reverse=not asc)
            return self.iloc[positions]
        raise ValueError("Invalid 'by' argument for sort_values")

    def reset_index(self, drop=False):
        if drop:
            df_copy = self.copy()
            df_copy.index = list(range(len(self._index)))
            return df_copy
        new_data = {"index": list(self._index)}
        for c in self._columns:
            new_data[c] = list(self._data[c]._values)
        return DataFrame(new_data, index=list(range(len(self._index))), columns=["index"] + list(self._columns))

    def groupby(self, by):
        return _DataFrameGroupBy(self, by)

    # Column-wise aggregations on DataFrame
    def sum(self, numeric_only=False):
        cols = [
            c for c in self._columns
            if not numeric_only or self._data[c].dtype in ("int64", "float64", "bool")
        ]
        vals = [self._data[c].sum() for c in cols]
        return Series(vals, index=cols)

    def mean(self, numeric_only=True):
        cols = [
            c for c in self._columns
            if self._data[c].dtype in ("int64", "float64", "bool")
        ]
        vals = [self._data[c].mean() for c in cols]
        return Series(vals, index=cols)

    def min(self, numeric_only=False):
        cols = [
            c for c in self._columns
            if not numeric_only or self._data[c].dtype in ("int64", "float64", "bool")
        ]
        vals = [self._data[c].min() for c in cols]
        return Series(vals, index=cols)

    def max(self, numeric_only=False):
        cols = [
            c for c in self._columns
            if not numeric_only or self._data[c].dtype in ("int64", "float64", "bool")
        ]
        vals = [self._data[c].max() for c in cols]
        return Series(vals, index=cols)

    def count(self):
        vals = [self._data[c].count() for c in self._columns]
        return Series(vals, index=list(self._columns), dtype="int64")

    def describe(self):
        num_cols = [c for c in self._columns if self._data[c].dtype in ("int64", "float64")]
        metrics = ["count", "mean", "min", "median", "max"]
        data = {}
        for c in num_cols:
            s = self._data[c]
            data[c] = [
                float(s.count()),
                float(s.mean()),
                float(s.min()),
                float(s.median()),
                float(s.max()),
            ]
        return DataFrame(data, index=metrics, columns=num_cols)

    def __str__(self):
        if len(self._columns) == 0:
            return f"Empty DataFrame\nColumns: []\nIndex: {repr(self._index)}"
        if len(self._index) == 0:
            return f"Empty DataFrame\nColumns: {repr(self._columns)}\nIndex: []"

        idx_strs = [str(i) for i in self._index]
        idx_width = builtins_max(len(s) for s in idx_strs)

        col_formatted = {}
        col_widths = {}
        for c in self._columns:
            c_str = str(c)
            formatted_vals = _format_column_values(self._data[c]._values, self._data[c].dtype)
            col_formatted[c] = formatted_vals
            max_v_len = builtins_max([len(s) for s in formatted_vals] + [len(c_str)])
            col_widths[c] = max_v_len

        header_parts = [" " * idx_width]
        for c in self._columns:
            header_parts.append(str(c).rjust(col_widths[c]))
        lines = ["  ".join(header_parts)]

        for r in range(len(self._index)):
            row_parts = [idx_strs[r].rjust(idx_width)]
            for c in self._columns:
                row_parts.append(col_formatted[c][r].rjust(col_widths[c]))
            lines.append("  ".join(row_parts))

        return "\n".join(lines)

    def __repr__(self):
        return self.__str__()


# Top-level Pandas functions
def concat(objs, axis=0, ignore_index=False):
    objs = list(objs)
    if not objs:
        return DataFrame()
    if all(isinstance(o, Series) for o in objs):
        vals = []
        idxs = []
        for s in objs:
            vals.extend(s._values)
            idxs.extend(s._index)
        if ignore_index:
            idxs = list(range(len(vals)))
        return Series(vals, index=idxs, name=objs[0].name)

    if axis == 0:
        cols = []
        for df in objs:
            for c in df._columns:
                if c not in cols:
                    cols.append(c)
        new_data = {c: [] for c in cols}
        new_idx = []
        for df in objs:
            new_idx.extend(df._index)
            for c in cols:
                if c in df._data:
                    new_data[c].extend(df._data[c]._values)
                else:
                    new_data[c].extend([float("nan")] * len(df))
        if ignore_index:
            new_idx = list(range(len(new_idx)))
        return DataFrame(new_data, index=new_idx, columns=cols)

    elif axis == 1:
        n_rows = builtins_max(len(df) for df in objs)
        new_data = {}
        cols = []
        for df in objs:
            for c in df._columns:
                cols.append(c)
                vals = list(df._data[c]._values)
                if len(vals) < n_rows:
                    vals.extend([float("nan")] * (n_rows - len(vals)))
                new_data[c] = vals
        idx = list(range(n_rows)) if ignore_index else list(objs[0]._index)
        return DataFrame(new_data, index=idx, columns=cols)

    raise ValueError("Unsupported axis for concat")


def merge(left, right, on=None, how="inner", left_on=None, right_on=None):
    key_left = left_on or on
    key_right = right_on or on
    if key_left is None or key_right is None:
        common = [c for c in left._columns if c in right._columns]
        if not common:
            raise ValueError("No common columns to perform merge on")
        key_left = key_right = common[0]

    # Build output columns
    out_cols = list(left._columns)
    for c in right._columns:
        if c == key_right and key_left == key_right:
            continue
        if c in out_cols:
            out_cols.append(f"{c}_y")
        else:
            out_cols.append(c)

    rows_out = []
    l_vals = left._data[key_left]._values
    r_vals = right._data[key_right]._values

    if how == "inner":
        for i_l, kv_l in enumerate(l_vals):
            for i_r, kv_r in enumerate(r_vals):
                if not isna(kv_l) and not isna(kv_r) and kv_l == kv_r:
                    row = {}
                    for c in left._columns:
                        row[c] = left._data[c]._values[i_l]
                    for c in right._columns:
                        if c == key_right and key_left == key_right:
                            continue
                        row[c] = right._data[c]._values[i_r]
                    rows_out.append(row)

    elif how == "left":
        for i_l, kv_l in enumerate(l_vals):
            matched = False
            for i_r, kv_r in enumerate(r_vals):
                if not isna(kv_l) and not isna(kv_r) and kv_l == kv_r:
                    matched = True
                    row = {}
                    for c in left._columns:
                        row[c] = left._data[c]._values[i_l]
                    for c in right._columns:
                        if c == key_right and key_left == key_right:
                            continue
                        row[c] = right._data[c]._values[i_r]
                    rows_out.append(row)
            if not matched:
                row = {}
                for c in left._columns:
                    row[c] = left._data[c]._values[i_l]
                for c in right._columns:
                    if c == key_right and key_left == key_right:
                        continue
                    row[c] = float("nan")
                rows_out.append(row)

    elif how == "right":
        for i_r, kv_r in enumerate(r_vals):
            matched = False
            for i_l, kv_l in enumerate(l_vals):
                if not isna(kv_l) and not isna(kv_r) and kv_l == kv_r:
                    matched = True
                    row = {}
                    for c in left._columns:
                        row[c] = left._data[c]._values[i_l]
                    for c in right._columns:
                        if c == key_right and key_left == key_right:
                            continue
                        row[c] = right._data[c]._values[i_r]
                    rows_out.append(row)
            if not matched:
                row = {}
                for c in left._columns:
                    row[c] = kv_r if c == key_left else float("nan")
                for c in right._columns:
                    if c == key_right and key_left == key_right:
                        continue
                    row[c] = right._data[c]._values[i_r]
                rows_out.append(row)

    elif how == "outer":
        seen_keys = []
        for k in list(l_vals) + list(r_vals):
            if not isna(k) and k not in seen_keys:
                seen_keys.append(k)
        for k in seen_keys:
            l_matches = [i for i, v in enumerate(l_vals) if v == k]
            r_matches = [i for i, v in enumerate(r_vals) if v == k]
            if l_matches and r_matches:
                for i_l in l_matches:
                    for i_r in r_matches:
                        row = {c: left._data[c]._values[i_l] for c in left._columns}
                        for c in right._columns:
                            if c != key_right or key_left != key_right:
                                row[c] = right._data[c]._values[i_r]
                        rows_out.append(row)
            elif l_matches:
                for i_l in l_matches:
                    row = {c: left._data[c]._values[i_l] for c in left._columns}
                    for c in right._columns:
                        if c != key_right or key_left != key_right:
                            row[c] = float("nan")
                    rows_out.append(row)
            elif r_matches:
                for i_r in r_matches:
                    row = {c: (k if c == key_left else float("nan")) for c in left._columns}
                    for c in right._columns:
                        if c != key_right or key_left != key_right:
                            row[c] = right._data[c]._values[i_r]
                    rows_out.append(row)

    if not rows_out:
        return DataFrame(columns=out_cols)
    return DataFrame(rows_out, columns=out_cols)


# Built-in virtual CSV files for interactive exercises
_VIRTUAL_CSV_FILES = {
    "penjualan.csv": """produk,kategori,harga,terjual
Laptop,Elektronik,8500000,12
Mouse,Aksesoris,150000,45
Keyboard,Aksesoris,350000,30
Monitor,Elektronik,2200000,18
Headset,Aksesoris,250000,25""",
    "siswa.csv": """nama,kelas,matematika,bahasa,ipa
Budi,10A,85,88,90
Siti,10B,92,95,89
Andi,10A,76,80,78
Dewi,10B,88,90,94
Riko,10A,65,72,70""",
    "karyawan.csv": """id,nama,divisi,gaji
101,Arif,IT,9000000
102,Bunga,HR,7500000
103,Candra,IT,9500000
104,Dinda,Finance,8500000
105,Eka,HR,7800000""",
    "toko.csv": """cabang,kota,omzet,pelanggan
Cabang A,Jakarta,50000000,420
Cabang B,Bandung,35000000,310
Cabang C,Surabaya,45000000,390
Cabang D,Yogyakarta,30000000,280""",
}


def _parse_csv_cell(raw_str):
    s = raw_str.strip()
    if s == "" or s.upper() in ("NAN", "NULL", "NA", "NONE"):
        return float("nan")
    try:
        if "." not in s:
            return int(s)
        return float(s)
    except ValueError:
        return s


def read_csv(filepath_or_buffer, sep=","):
    if hasattr(filepath_or_buffer, "read"):
        content = filepath_or_buffer.read()
    elif isinstance(filepath_or_buffer, str):
        if filepath_or_buffer in _VIRTUAL_CSV_FILES:
            content = _VIRTUAL_CSV_FILES[filepath_or_buffer]
        elif "\n" in filepath_or_buffer:
            content = filepath_or_buffer
        else:
            with open(filepath_or_buffer, "r", encoding="utf-8") as f:
                content = f.read()
    else:
        raise TypeError("Unsupported filepath_or_buffer for read_csv")

    reader = csv.reader(io.StringIO(content.strip()), delimiter=sep)
    rows = list(reader)
    if not rows:
        return DataFrame()
    headers = [h.strip() for h in rows[0]]
    data_rows = []
    for r in rows[1:]:
        if not r:
            continue
        data_rows.append([_parse_csv_cell(cell) for cell in r])
    return DataFrame(data_rows, columns=headers)

