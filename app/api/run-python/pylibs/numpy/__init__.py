"""
Pure-Python compatible NumPy engine for PyDocs.id interactive execution sandbox.
Provides authentic NumPy ndarray behavior, formatting, indexing, slicing,
broadcasting, ufuncs, statistics (with axis support), and linalg operations.
"""

import math
import copy as _copy

__version__ = "2.1.0"

builtins_abs = __builtins__["abs"] if isinstance(__builtins__, dict) else getattr(__builtins__, "abs")
builtins_round = __builtins__["round"] if isinstance(__builtins__, dict) else getattr(__builtins__, "round")
builtins_min = __builtins__["min"] if isinstance(__builtins__, dict) else getattr(__builtins__, "min")
builtins_max = __builtins__["max"] if isinstance(__builtins__, dict) else getattr(__builtins__, "max")
builtins_sum = __builtins__["sum"] if isinstance(__builtins__, dict) else getattr(__builtins__, "sum")

int64 = "int64"
int32 = "int32"
float64 = "float64"
float32 = "float32"
bool_ = "bool"
str_ = "<U"


class dtype:
    def __init__(self, name):
        if name in (int, "int", "int64", "int32"):
            self.name = "int64"
        elif name in (float, "float", "float64", "float32"):
            self.name = "float64"
        elif name in (bool, "bool"):
            self.name = "bool"
        elif name in (str, "str", "<U"):
            self.name = "<U"
        else:
            self.name = str(name)

    def __repr__(self):
        return f"dtype('{self.name}')"

    def __str__(self):
        return self.name

    def __eq__(self, other):
        if isinstance(other, dtype):
            return self.name == other.name
        if other in (int, "int", "int64"):
            return self.name == "int64"
        if other in (float, "float", "float64"):
            return self.name == "float64"
        if other in (bool, "bool"):
            return self.name == "bool"
        return self.name == str(other)


def _infer_dtype(flat_items, explicit_dtype=None):
    if explicit_dtype is not None:
        return dtype(explicit_dtype)
    if not flat_items:
        return dtype("float64")
    has_float = False
    has_int = False
    has_bool = False
    has_str = False
    for x in flat_items:
        if isinstance(x, str):
            has_str = True
        elif isinstance(x, bool):
            has_bool = True
        elif isinstance(x, float):
            has_float = True
        elif isinstance(x, int):
            has_int = True
    if has_str:
        return dtype("<U")
    if has_float:
        return dtype("float64")
    if has_int:
        return dtype("int64")
    if has_bool:
        return dtype("bool")
    return dtype("float64")


def _cast_scalar(val, dt_name):
    if dt_name == "int64" or dt_name == "int32":
        return int(float(val)) if isinstance(val, str) else int(val)
    if dt_name == "float64" or dt_name == "float32":
        return float(val)
    if dt_name == "bool":
        return bool(val)
    if dt_name.startswith("<U") or dt_name == "str":
        return str(val)
    return val


def _flatten(nested):
    if isinstance(nested, ndarray):
        return _flatten(nested._data)
    if isinstance(nested, (list, tuple)):
        out = []
        for item in nested:
            out.extend(_flatten(item))
        return out
    return [nested]


def _compute_shape(data):
    if not isinstance(data, (list, tuple)):
        return ()
    if len(data) == 0:
        return (0,)
    inner_shape = _compute_shape(data[0])
    for item in data[1:]:
        if _compute_shape(item) != inner_shape:
            raise ValueError("ValueError: setting an array element with a sequence (inhomogeneous shape).")
    return (len(data),) + inner_shape


def _cast_nested(data, dt_name):
    if isinstance(data, (list, tuple)):
        return [_cast_nested(x, dt_name) for x in data]
    return _cast_scalar(data, dt_name)


def _reshape_flat(flat_list, shape):
    if len(shape) == 0:
        return flat_list[0]
    if len(shape) == 1:
        return list(flat_list[: shape[0]])
    step = 1
    for s in shape[1:]:
        step *= s
    return [
        _reshape_flat(flat_list[i * step : (i + 1) * step], shape[1:])
        for i in range(shape[0])
    ]


def _format_float(val, all_floats):
    # Check if all floats in array are effectively integers (e.g. 1.0, 2.0)
    if all(abs(x - round(x)) < 1e-12 for x in all_floats):
        return f"{int(round(val))}."
    # Otherwise format cleanly up to 8 significant digits without trailing zeros
    s = f"{val:.6f}".rstrip("0")
    if s.endswith("."):
        s += "0"
    return s


def _format_array(arr):
    shape = arr.shape
    dt = arr.dtype.name
    flat = _flatten(arr._data)
    if len(shape) == 0:
        return str(arr._data)

    if dt == "float64" or dt == "float32":
        all_Have_Int = all(builtins_abs(x - builtins_round(x)) < 1e-12 for x in flat)
        if all_Have_Int:
            str_items = [f"{int(builtins_round(x))}." for x in flat]
        else:
            # Determine max decimal places needed (up to 4 or 8)
            formatted = []
            for x in flat:
                if builtins_abs(x) < 1e-12:
                    x = 0.0
                s = f"{x:.8f}".rstrip("0")
                formatted.append(s)
            str_items = formatted
    elif dt == "bool":
        str_items = ["True" if x else "False" for x in flat]
    elif dt.startswith("<U") or dt == "str":
        str_items = [f"'{x}'" for x in flat]
    else:
        str_items = [str(int(x)) for x in flat]

    if not str_items:
        return "[]"

    col_width = builtins_max(len(s) for s in str_items)

    def _build_str(sub_shape, items, indent=0):
        if len(sub_shape) == 1:
            if len(shape) == 1:
                # 1D array: single space separated unless float alignment needed
                if dt in ("int64", "int32") and len(set(len(s) for s in items)) > 1 and len(shape) > 1:
                    padded = [s.rjust(col_width) for s in items]
                else:
                    padded = items
                return "[" + " ".join(padded) + "]"
            else:
                padded = [s.rjust(col_width) for s in items]
                return "[" + " ".join(padded) + "]"
        step = 1
        for s in sub_shape[1:]:
            step *= s
        parts = []
        for i in range(sub_shape[0]):
            chunk = items[i * step : (i + 1) * step]
            parts.append(_build_str(sub_shape[1:], chunk, indent + 1))
        sep = "\n" + (" " * (indent + 1))
        if len(sub_shape) > 2:
            sep = "\n\n" + (" " * (indent + 1))
        return "[" + sep.join(parts) + "]"

    return _build_str(shape, str_items, 0)


def _broadcast_op(a, b, op, is_bool_out=False):
    if not isinstance(a, ndarray):
        a = array(a)
    if not isinstance(b, ndarray):
        b = array(b)

    # Scalar broadcasting
    if a.ndim == 0 and b.ndim == 0:
        res = op(a._data, b._data)
        return res
    if a.ndim == 0:
        scalar = a._data
        flat_b = _flatten(b._data)
        out_flat = [op(scalar, y) for y in flat_b]
        dt = "bool" if is_bool_out else None
        return array(_reshape_flat(out_flat, b.shape), dtype=dt)
    if b.ndim == 0:
        scalar = b._data
        flat_a = _flatten(a._data)
        out_flat = [op(x, scalar) for x in flat_a]
        dt = "bool" if is_bool_out else None
        return array(_reshape_flat(out_flat, a.shape), dtype=dt)

    # Same shape
    if a.shape == b.shape:
        flat_a = _flatten(a._data)
        flat_b = _flatten(b._data)
        out_flat = [op(x, y) for x, y in zip(flat_a, flat_b)]
        dt = "bool" if is_bool_out else None
        return array(_reshape_flat(out_flat, a.shape), dtype=dt)

    # 2D (M, N) and 1D (N,) or (1, N)
    if a.ndim == 2 and b.ndim == 1 and a.shape[1] == b.shape[0]:
        rows = []
        for r in range(a.shape[0]):
            rows.append([op(a._data[r][c], b._data[c]) for c in range(a.shape[1])])
        dt = "bool" if is_bool_out else None
        return array(rows, dtype=dt)

    if a.ndim == 1 and b.ndim == 2 and a.shape[0] == b.shape[1]:
        rows = []
        for r in range(b.shape[0]):
            rows.append([op(a._data[c], b._data[r][c]) for c in range(b.shape[1])])
        dt = "bool" if is_bool_out else None
        return array(rows, dtype=dt)

    # 2D (M, N) and 2D (M, 1)
    if a.ndim == 2 and b.ndim == 2 and a.shape[0] == b.shape[0] and b.shape[1] == 1:
        rows = []
        for r in range(a.shape[0]):
            rows.append([op(a._data[r][c], b._data[r][0]) for c in range(a.shape[1])])
        dt = "bool" if is_bool_out else None
        return array(rows, dtype=dt)

    if a.ndim == 2 and b.ndim == 2 and a.shape[0] == b.shape[0] and a.shape[1] == 1:
        rows = []
        for r in range(b.shape[0]):
            rows.append([op(a._data[r][0], b._data[r][c]) for c in range(b.shape[1])])
        dt = "bool" if is_bool_out else None
        return array(rows, dtype=dt)

    # 2D (M, N) and 2D (1, N)
    if a.ndim == 2 and b.ndim == 2 and a.shape[0] == 1 and a.shape[1] == b.shape[1]:
        rows = []
        for r in range(b.shape[0]):
            rows.append([op(a._data[0][c], b._data[r][c]) for c in range(b.shape[1])])
        dt = "bool" if is_bool_out else None
        return array(rows, dtype=dt)

    if a.ndim == 2 and b.ndim == 2 and b.shape[0] == 1 and a.shape[1] == b.shape[1]:
        rows = []
        for r in range(a.shape[0]):
            rows.append([op(a._data[r][c], b._data[0][c]) for c in range(a.shape[1])])
        dt = "bool" if is_bool_out else None
        return array(rows, dtype=dt)

    # 1D (M, 1) and 1D (N,) -> (M, N)
    if a.ndim == 2 and a.shape[1] == 1 and b.ndim == 1:
        rows = []
        for r in range(a.shape[0]):
            rows.append([op(a._data[r][0], b._data[c]) for c in range(b.shape[0])])
        dt = "bool" if is_bool_out else None
        return array(rows, dtype=dt)

    raise ValueError(f"ValueError: operands could not be broadcast together with shapes {a.shape} {b.shape}")


class ndarray:
    def __init__(self, data, dtype_obj=None):
        if isinstance(data, ndarray):
            data = _copy.deepcopy(data._data)
            if dtype_obj is None:
                dtype_obj = data.dtype if hasattr(data, "dtype") else None
        flat = _flatten(data)
        self.dtype = _infer_dtype(flat, dtype_obj)
        self._data = _cast_nested(data, self.dtype.name)
        self.shape = _compute_shape(self._data)
        self.ndim = len(self.shape)
        sz = 1
        for s in self.shape:
            sz *= s
        self.size = sz if self.ndim > 0 else 1

    def __len__(self):
        if self.ndim == 0:
            raise TypeError("len() of unsized object")
        return self.shape[0]

    def __iter__(self):
        if self.ndim == 1:
            for x in self._data:
                yield x
        elif self.ndim > 1:
            for row in self._data:
                yield ndarray(row, self.dtype)

    def __str__(self):
        return _format_array(self)

    def __repr__(self):
        s = _format_array(self)
        lines = s.split("\n")
        if len(lines) == 1:
            return f"array({s})"
        indented = "\n".join([lines[0]] + ["      " + ln for ln in lines[1:]])
        return f"array({indented})"

    def tolist(self):
        return _copy.deepcopy(self._data)

    def copy(self):
        return ndarray(_copy.deepcopy(self._data), self.dtype)

    def astype(self, new_dtype):
        return ndarray(_copy.deepcopy(self._data), new_dtype)

    def flatten(self):
        return ndarray(_flatten(self._data), self.dtype)

    def ravel(self):
        return self.flatten()

    def reshape(self, *new_shape):
        if len(new_shape) == 1 and isinstance(new_shape[0], (list, tuple)):
            new_shape = tuple(new_shape[0])
        else:
            new_shape = tuple(new_shape)

        # Handle -1 dimension inference
        neg_idx = -1
        known_prod = 1
        for idx, dim in enumerate(new_shape):
            if dim == -1:
                if neg_idx != -1:
                    raise ValueError("ValueError: can only specify one unknown dimension")
                neg_idx = idx
            else:
                known_prod *= dim
        if neg_idx != -1:
            if self.size % known_prod != 0:
                raise ValueError(f"ValueError: cannot reshape array of size {self.size} into shape {new_shape}")
            inferred = self.size // known_prod
            new_shape = tuple(inferred if i == neg_idx else d for i, d in enumerate(new_shape))

        prod = 1
        for d in new_shape:
            prod *= d
        if prod != self.size:
            raise ValueError(f"ValueError: cannot reshape array of size {self.size} into shape {new_shape}")

        flat = _flatten(self._data)
        return ndarray(_reshape_flat(flat, new_shape), self.dtype)

    def transpose(self):
        if self.ndim <= 1:
            return self.copy()
        if self.ndim == 2:
            rows, cols = self.shape
            transposed = [[self._data[r][c] for r in range(rows)] for c in range(cols)]
            return ndarray(transposed, self.dtype)
        raise NotImplementedError("Transpose only supported for 1D and 2D arrays")

    @property
    def T(self):
        return self.transpose()

    def __getitem__(self, key):
        # Boolean mask indexing
        if isinstance(key, ndarray) and key.dtype.name == "bool":
            flat_data = _flatten(self._data)
            flat_mask = _flatten(key._data)
            if len(flat_data) != len(flat_mask):
                raise IndexError("IndexError: boolean index did not match indexed array")
            filtered = [val for val, m in zip(flat_data, flat_mask) if m]
            return ndarray(filtered, self.dtype)

        # Fancy list indexing on 1D
        if isinstance(key, list):
            if all(isinstance(k, bool) for k in key):
                filtered = [val for val, m in zip(self._data, key) if m]
                return ndarray(filtered, self.dtype)
            return ndarray([self._data[k] for k in key], self.dtype)

        # 2D indexing arr[row_spec, col_spec]
        if isinstance(key, tuple):
            if self.ndim != 2 or len(key) != 2:
                raise IndexError("IndexError: invalid index for array dimension")
            row_key, col_key = key
            rows_selected = self._data[row_key]
            if isinstance(row_key, int):
                # rows_selected is a 1D list
                res = rows_selected[col_key]
                if isinstance(res, list):
                    return ndarray(res, self.dtype)
                return res
            else:
                # rows_selected is a list of rows
                if isinstance(col_key, int):
                    return ndarray([r[col_key] for r in rows_selected], self.dtype)
                else:
                    return ndarray([r[col_key] for r in rows_selected], self.dtype)

        # 1D or row-level indexing
        res = self._data[key]
        if isinstance(res, list):
            return ndarray(res, self.dtype)
        return res

    def __setitem__(self, key, value):
        dt_name = self.dtype.name
        if isinstance(key, ndarray) and key.dtype.name == "bool":
            if self.ndim == 1:
                for i, m in enumerate(key._data):
                    if m:
                        self._data[i] = _cast_scalar(value, dt_name)
                return
            elif self.ndim == 2:
                for r in range(self.shape[0]):
                    for c in range(self.shape[1]):
                        if key._data[r][c]:
                            self._data[r][c] = _cast_scalar(value, dt_name)
                return

        if isinstance(key, tuple) and self.ndim == 2 and len(key) == 2:
            r_key, c_key = key
            row_indices = range(*r_key.indices(self.shape[0])) if isinstance(r_key, slice) else [r_key if r_key >= 0 else self.shape[0] + r_key]
            col_indices = range(*c_key.indices(self.shape[1])) if isinstance(c_key, slice) else [c_key if c_key >= 0 else self.shape[1] + c_key]
            for r in row_indices:
                for c in col_indices:
                    self._data[r][c] = _cast_scalar(value, dt_name)
            return

        if isinstance(key, slice):
            indices = range(*key.indices(len(self._data)))
            if isinstance(value, (list, ndarray)):
                val_list = value.tolist() if isinstance(value, ndarray) else value
                for idx, v in zip(indices, val_list):
                    self._data[idx] = _cast_scalar(v, dt_name)
            else:
                for idx in indices:
                    if self.ndim == 1:
                        self._data[idx] = _cast_scalar(value, dt_name)
                    else:
                        self._data[idx] = [_cast_scalar(value, dt_name) for _ in range(self.shape[1])]
            return

        if self.ndim == 1:
            self._data[key] = _cast_scalar(value, dt_name)
        else:
            if isinstance(value, (list, ndarray)):
                val_list = value.tolist() if isinstance(value, ndarray) else value
                self._data[key] = [_cast_scalar(v, dt_name) for v in val_list]
            else:
                self._data[key] = [_cast_scalar(value, dt_name) for _ in range(self.shape[1])]

    # Arithmetic operators
    def __add__(self, other):
        return _broadcast_op(self, other, lambda x, y: x + y)

    def __radd__(self, other):
        return _broadcast_op(other, self, lambda x, y: x + y)

    def __sub__(self, other):
        return _broadcast_op(self, other, lambda x, y: x - y)

    def __rsub__(self, other):
        return _broadcast_op(other, self, lambda x, y: x - y)

    def __mul__(self, other):
        return _broadcast_op(self, other, lambda x, y: x * y)

    def __rmul__(self, other):
        return _broadcast_op(other, self, lambda x, y: x * y)

    def __truediv__(self, other):
        return _broadcast_op(self, other, lambda x, y: float(x) / float(y))

    def __rtruediv__(self, other):
        return _broadcast_op(other, self, lambda x, y: float(x) / float(y))

    def __floordiv__(self, other):
        return _broadcast_op(self, other, lambda x, y: x // y)

    def __rfloordiv__(self, other):
        return _broadcast_op(other, self, lambda x, y: x // y)

    def __mod__(self, other):
        return _broadcast_op(self, other, lambda x, y: x % y)

    def __pow__(self, other):
        return _broadcast_op(self, other, lambda x, y: x ** y)

    def __neg__(self):
        return _broadcast_op(self, -1, lambda x, y: x * y)

    # Matrix multiplication (@)
    def __matmul__(self, other):
        return dot(self, other)

    # Comparison operators
    def __lt__(self, other):
        return _broadcast_op(self, other, lambda x, y: bool(x < y), is_bool_out=True)

    def __le__(self, other):
        return _broadcast_op(self, other, lambda x, y: bool(x <= y), is_bool_out=True)

    def __gt__(self, other):
        return _broadcast_op(self, other, lambda x, y: bool(x > y), is_bool_out=True)

    def __ge__(self, other):
        return _broadcast_op(self, other, lambda x, y: bool(x >= y), is_bool_out=True)

    def __eq__(self, other):
        return _broadcast_op(self, other, lambda x, y: bool(x == y), is_bool_out=True)

    def __ne__(self, other):
        return _broadcast_op(self, other, lambda x, y: bool(x != y), is_bool_out=True)

    # Bitwise logical operators for boolean masks
    def __and__(self, other):
        return _broadcast_op(self, other, lambda x, y: bool(x) and bool(y), is_bool_out=True)

    def __or__(self, other):
        return _broadcast_op(self, other, lambda x, y: bool(x) or bool(y), is_bool_out=True)

    def __invert__(self):
        if self.dtype.name == "bool":
            flat = [not bool(x) for x in _flatten(self._data)]
            return ndarray(_reshape_flat(flat, self.shape), dtype="bool")
        flat = [~int(x) for x in _flatten(self._data)]
        return ndarray(_reshape_flat(flat, self.shape), dtype="int64")

    # Aggregation methods
    def sum(self, axis=None):
        return sum(self, axis=axis)

    def mean(self, axis=None):
        return mean(self, axis=axis)

    def min(self, axis=None):
        return min(self, axis=axis)

    def max(self, axis=None):
        return max(self, axis=axis)

    def std(self, axis=None):
        return std(self, axis=axis)

    def var(self, axis=None):
        return var(self, axis=axis)

    def argmin(self, axis=None):
        return argmin(self, axis=axis)

    def argmax(self, axis=None):
        return argmax(self, axis=axis)

    def cumsum(self, axis=None):
        return cumsum(self, axis=axis)

    def dot(self, other):
        return dot(self, other)


# Array Creation Functions
def array(obj, dtype=None):
    return ndarray(obj, dtype_obj=dtype)


def zeros(shape, dtype=float64):
    if isinstance(shape, int):
        shape = (shape,)
    total = 1
    for s in shape:
        total *= s
    flat = [0.0] * total
    return ndarray(_reshape_flat(flat, shape), dtype_obj=dtype)


def ones(shape, dtype=float64):
    if isinstance(shape, int):
        shape = (shape,)
    total = 1
    for s in shape:
        total *= s
    flat = [1.0] * total
    return ndarray(_reshape_flat(flat, shape), dtype_obj=dtype)


def full(shape, fill_value, dtype=None):
    if isinstance(shape, int):
        shape = (shape,)
    total = 1
    for s in shape:
        total *= s
    flat = [fill_value] * total
    return ndarray(_reshape_flat(flat, shape), dtype_obj=dtype)


def arange(start, stop=None, step=1, dtype=None):
    if stop is None:
        stop = start
        start = 0
    vals = []
    curr = start
    if step > 0:
        while curr < stop - 1e-12:
            vals.append(curr)
            curr += step
    elif step < 0:
        while curr > stop + 1e-12:
            vals.append(curr)
            curr += step
    else:
        raise ValueError("ValueError: arange() step cannot be zero")
    return ndarray(vals, dtype_obj=dtype)


def linspace(start, stop, num=50, endpoint=True, dtype=float64):
    if num <= 0:
        return ndarray([], dtype_obj=dtype)
    if num == 1:
        return ndarray([float(start)], dtype_obj=dtype)
    div = (num - 1) if endpoint else num
    step = (stop - start) / float(div)
    vals = [float(start + i * step) for i in range(num)]
    if endpoint and num > 1:
        vals[-1] = float(stop)
    return ndarray(vals, dtype_obj=dtype)


def eye(N, M=None, k=0, dtype=float64):
    if M is None:
        M = N
    mat = []
    for r in range(N):
        row = [1.0 if (c - r) == k else 0.0 for c in range(M)]
        mat.append(row)
    return ndarray(mat, dtype_obj=dtype)


def identity(n, dtype=float64):
    return eye(n, n, dtype=dtype)


# Universal Functions (ufuncs)
def _apply_unary(arr, fn, out_dtype=None):
    if not isinstance(arr, ndarray):
        if isinstance(arr, (list, tuple)):
            arr = array(arr)
        else:
            return fn(arr)
    flat = [fn(x) for x in _flatten(arr._data)]
    return ndarray(_reshape_flat(flat, arr.shape), dtype_obj=out_dtype)


def sqrt(x):
    return _apply_unary(x, lambda v: math.sqrt(float(v)), out_dtype=float64)


def abs(x):
    if not isinstance(x, ndarray):
        arr = array(x) if isinstance(x, (list, tuple)) else None
        if arr is None:
            return builtins_abs(x)
        x = arr
    return _apply_unary(x, builtins_abs, out_dtype=x.dtype.name)


def round(x, decimals=0):
    if decimals == 0:
        return _apply_unary(
            x,
            lambda v: float(builtins_round(v)) if isinstance(v, float) else builtins_round(v),
            out_dtype=x.dtype.name if isinstance(x, ndarray) else None,
        )
    return _apply_unary(x, lambda v: builtins_round(float(v), decimals), out_dtype=float64)


def floor(x):
    return _apply_unary(x, lambda v: float(math.floor(v)), out_dtype=float64)


def ceil(x):
    return _apply_unary(x, lambda v: float(math.ceil(v)), out_dtype=float64)


def exp(x):
    return _apply_unary(x, lambda v: math.exp(float(v)), out_dtype=float64)


def log(x):
    return _apply_unary(x, lambda v: math.log(float(v)), out_dtype=float64)


def log10(x):
    return _apply_unary(x, lambda v: math.log10(float(v)), out_dtype=float64)


# Conditional & Filtering Functions
def where(condition, x=None, y=None):
    cond_arr = condition if isinstance(condition, ndarray) else array(condition, dtype=bool_)
    if x is None and y is None:
        # Return tuple of index arrays where condition is True
        if cond_arr.ndim == 1:
            idxs = [i for i, v in enumerate(cond_arr._data) if v]
            return (ndarray(idxs, dtype=int64),)
        elif cond_arr.ndim == 2:
            r_idxs, c_idxs = [], []
            for r in range(cond_arr.shape[0]):
                for c in range(cond_arr.shape[1]):
                    if cond_arr._data[r][c]:
                        r_idxs.append(r)
                        c_idxs.append(c)
            return (ndarray(r_idxs, dtype=int64), ndarray(c_idxs, dtype=int64))

    flat_cond = _flatten(cond_arr._data)
    if isinstance(x, ndarray):
        flat_x = _flatten(x._data)
    elif isinstance(x, list):
        flat_x = _flatten(x)
    else:
        flat_x = [x] * len(flat_cond)

    if isinstance(y, ndarray):
        flat_y = _flatten(y._data)
    elif isinstance(y, list):
        flat_y = _flatten(y)
    else:
        flat_y = [y] * len(flat_cond)

    out_flat = [vx if c else vy for c, vx, vy in zip(flat_cond, flat_x, flat_y)]
    return ndarray(_reshape_flat(out_flat, cond_arr.shape))


def clip(a, a_min, a_max):
    arr = a if isinstance(a, ndarray) else array(a)
    def _clip_val(v):
        if a_min is not None and v < a_min:
            return a_min
        if a_max is not None and v > a_max:
            return a_max
        return v
    return _apply_unary(arr, _clip_val, out_dtype=arr.dtype.name)


# Shape Manipulation & Joining
def reshape(a, newshape):
    arr = a if isinstance(a, ndarray) else array(a)
    return arr.reshape(newshape)


def transpose(a):
    arr = a if isinstance(a, ndarray) else array(a)
    return arr.transpose()


def concatenate(arrays, axis=0):
    arrs = [a if isinstance(a, ndarray) else array(a) for a in arrays]
    if not arrs:
        return array([])
    if arrs[0].ndim == 1 or axis is None:
        out = []
        for a in arrs:
            out.extend(_flatten(a._data))
        return array(out)
    if arrs[0].ndim == 2:
        if axis == 0:
            cols = arrs[0].shape[1]
            out = []
            for a in arrs:
                if a.shape[1] != cols:
                    raise ValueError("ValueError: all the input array dimensions for the concatenation axis must match exactly")
                out.extend(_copy.deepcopy(a._data))
            return array(out)
        elif axis == 1:
            rows = arrs[0].shape[0]
            out = [[] for _ in range(rows)]
            for a in arrs:
                if a.shape[0] != rows:
                    raise ValueError("ValueError: all the input array dimensions for the concatenation axis must match exactly")
                for r in range(rows):
                    out[r].extend(_copy.deepcopy(a._data[r]))
            return array(out)
    raise ValueError("Unsupported axis for concatenate")


def vstack(tup):
    arrs = [a if isinstance(a, ndarray) else array(a) for a in tup]
    rows = []
    for a in arrs:
        if a.ndim == 1:
            rows.append(list(a._data))
        elif a.ndim == 2:
            for r in a._data:
                rows.append(list(r))
    return array(rows)


def hstack(tup):
    arrs = [a if isinstance(a, ndarray) else array(a) for a in tup]
    if all(a.ndim == 1 for a in arrs):
        out = []
        for a in arrs:
            out.extend(a._data)
        return array(out)
    return concatenate(arrs, axis=1)


# Aggregations & Statistics
def _reduce_axis(a, fn, axis=None, out_dtype=None):
    arr = a if isinstance(a, ndarray) else array(a)
    if axis is None:
        return fn(_flatten(arr._data))
    if arr.ndim == 1 and axis == 0:
        return fn(arr._data)
    if arr.ndim == 2:
        rows, cols = arr.shape
        if axis == 0:
            res = [fn([arr._data[r][c] for r in range(rows)]) for c in range(cols)]
            return ndarray(res, dtype_obj=out_dtype)
        elif axis == 1:
            res = [fn(arr._data[r]) for r in range(rows)]
            return ndarray(res, dtype_obj=out_dtype)
    raise ValueError(f"axis {axis} is out of bounds for array of dimension {arr.ndim}")


def sum(a, axis=None):
    arr = a if isinstance(a, ndarray) else array(a)
    def _s(vals):
        total = builtins_sum(int(v) if isinstance(v, bool) else v for v in vals)
        return total
    out_dt = int64 if arr.dtype.name in ("int64", "int32", "bool") else float64
    return _reduce_axis(arr, _s, axis=axis, out_dtype=out_dt)


def mean(a, axis=None):
    def _m(vals):
        return float(builtins_sum(vals)) / len(vals)
    return _reduce_axis(a, _m, axis=axis, out_dtype=float64)


def median(a, axis=None):
    def _med(vals):
        s = sorted(vals)
        n = len(s)
        mid = n // 2
        if n % 2 == 1:
            return float(s[mid])
        return float(s[mid - 1] + s[mid]) / 2.0
    return _reduce_axis(a, _med, axis=axis, out_dtype=float64)


def min(a, axis=None):
    arr = a if isinstance(a, ndarray) else array(a)
    return _reduce_axis(arr, builtins_min, axis=axis, out_dtype=arr.dtype.name)


def max(a, axis=None):
    arr = a if isinstance(a, ndarray) else array(a)
    return _reduce_axis(arr, builtins_max, axis=axis, out_dtype=arr.dtype.name)


def var(a, axis=None):
    def _v(vals):
        m = float(builtins_sum(vals)) / len(vals)
        return builtins_sum((float(x) - m) ** 2 for x in vals) / len(vals)
    return _reduce_axis(a, _v, axis=axis, out_dtype=float64)


def std(a, axis=None):
    def _st(vals):
        m = float(builtins_sum(vals)) / len(vals)
        v = builtins_sum((float(x) - m) ** 2 for x in vals) / len(vals)
        return math.sqrt(v)
    return _reduce_axis(a, _st, axis=axis, out_dtype=float64)


def argmin(a, axis=None):
    def _amin(vals):
        best_i = 0
        best_v = vals[0]
        for i, v in enumerate(vals):
            if v < best_v:
                best_v = v
                best_i = i
        return best_i
    return _reduce_axis(a, _amin, axis=axis, out_dtype=int64)


def argmax(a, axis=None):
    def _amax(vals):
        best_i = 0
        best_v = vals[0]
        for i, v in enumerate(vals):
            if v > best_v:
                best_v = v
                best_i = i
        return best_i
    return _reduce_axis(a, _amax, axis=axis, out_dtype=int64)


def cumsum(a, axis=None):
    arr = a if isinstance(a, ndarray) else array(a)
    def _cs(vals):
        out = []
        acc = 0
        for v in vals:
            acc += v
            out.append(acc)
        return out
    if axis is None or arr.ndim == 1:
        return ndarray(_cs(_flatten(arr._data)), dtype_obj=arr.dtype.name)
    if arr.ndim == 2:
        rows, cols = arr.shape
        if axis == 1:
            return ndarray([_cs(arr._data[r]) for r in range(rows)], dtype_obj=arr.dtype.name)
        elif axis == 0:
            cols_cs = [_cs([arr._data[r][c] for r in range(rows)]) for c in range(cols)]
            return ndarray([[cols_cs[c][r] for c in range(cols)] for r in range(rows)], dtype_obj=arr.dtype.name)
    raise ValueError("Unsupported axis for cumsum")


def sort(a, axis=-1):
    arr = a if isinstance(a, ndarray) else array(a)
    if arr.ndim == 1 or axis is None:
        return ndarray(sorted(_flatten(arr._data)), dtype_obj=arr.dtype.name)
    if arr.ndim == 2:
        rows, cols = arr.shape
        if axis == -1 or axis == 1:
            return ndarray([sorted(row) for row in arr._data], dtype_obj=arr.dtype.name)
        elif axis == 0:
            sorted_cols = [sorted([arr._data[r][c] for r in range(rows)]) for c in range(cols)]
            return ndarray([[sorted_cols[c][r] for c in range(cols)] for r in range(rows)], dtype_obj=arr.dtype.name)
    raise ValueError("Unsupported axis for sort")


def unique(a):
    arr = a if isinstance(a, ndarray) else array(a)
    vals = sorted(set(_flatten(arr._data)))
    return ndarray(vals, dtype_obj=arr.dtype.name)


# Linear Algebra Operations
def dot(a, b):
    arr_a = a if isinstance(a, ndarray) else array(a)
    arr_b = b if isinstance(b, ndarray) else array(b)

    # 1D . 1D -> scalar
    if arr_a.ndim == 1 and arr_b.ndim == 1:
        if arr_a.shape[0] != arr_b.shape[0]:
            raise ValueError(f"ValueError: shapes {arr_a.shape} and {arr_b.shape} not aligned")
        return builtins_sum(x * y for x, y in zip(arr_a._data, arr_b._data))

    # 2D @ 2D -> 2D
    if arr_a.ndim == 2 and arr_b.ndim == 2:
        m, k1 = arr_a.shape
        k2, n = arr_b.shape
        if k1 != k2:
            raise ValueError(f"ValueError: shapes {arr_a.shape} and {arr_b.shape} not aligned: {k1} (dim 1) != {k2} (dim 0)")
        res = []
        for r in range(m):
            row = []
            for c in range(n):
                val = builtins_sum(arr_a._data[r][i] * arr_b._data[i][c] for i in range(k1))
                row.append(val)
            res.append(row)
        out_dt = float64 if ("float" in arr_a.dtype.name or "float" in arr_b.dtype.name) else int64
        return ndarray(res, dtype_obj=out_dt)

    # 2D @ 1D -> 1D
    if arr_a.ndim == 2 and arr_b.ndim == 1:
        m, k1 = arr_a.shape
        k2 = arr_b.shape[0]
        if k1 != k2:
            raise ValueError(f"ValueError: shapes {arr_a.shape} and {arr_b.shape} not aligned")
        res = [builtins_sum(arr_a._data[r][i] * arr_b._data[i] for i in range(k1)) for r in range(m)]
        out_dt = float64 if ("float" in arr_a.dtype.name or "float" in arr_b.dtype.name) else int64
        return ndarray(res, dtype_obj=out_dt)

    # 1D @ 2D -> 1D
    if arr_a.ndim == 1 and arr_b.ndim == 2:
        k1 = arr_a.shape[0]
        k2, n = arr_b.shape
        if k1 != k2:
            raise ValueError(f"ValueError: shapes {arr_a.shape} and {arr_b.shape} not aligned")
        res = [builtins_sum(arr_a._data[i] * arr_b._data[i][c] for i in range(k1)) for c in range(n)]
        out_dt = float64 if ("float" in arr_a.dtype.name or "float" in arr_b.dtype.name) else int64
        return ndarray(res, dtype_obj=out_dt)

    return arr_a * arr_b


def matmul(a, b):
    return dot(a, b)


def diag(v):
    arr = v if isinstance(v, ndarray) else array(v)
    if arr.ndim == 1:
        n = arr.shape[0]
        mat = [[arr._data[r] if r == c else (0.0 if "float" in arr.dtype.name else 0) for c in range(n)] for r in range(n)]
        return ndarray(mat, dtype_obj=arr.dtype.name)
    if arr.ndim == 2:
        n = builtins_min(arr.shape[0], arr.shape[1])
        return ndarray([arr._data[i][i] for i in range(n)], dtype_obj=arr.dtype.name)
    raise ValueError("Input must be 1- or 2-d")


def trace(a):
    arr = a if isinstance(a, ndarray) else array(a)
    if arr.ndim != 2:
        raise ValueError("trace requires 2D array")
    n = builtins_min(arr.shape[0], arr.shape[1])
    return builtins_sum(arr._data[i][i] for i in range(n))


class _LinalgModule:
    @staticmethod
    def _det_recursive(mat):
        n = len(mat)
        if n == 1:
            return float(mat[0][0])
        if n == 2:
            return float(mat[0][0] * mat[1][1] - mat[0][1] * mat[1][0])
        total = 0.0
        for c in range(n):
            sub = [[mat[r][col] for col in range(n) if col != c] for r in range(1, n)]
            sign = 1.0 if c % 2 == 0 else -1.0
            total += sign * float(mat[0][c]) * _LinalgModule._det_recursive(sub)
        return total

    @staticmethod
    def det(a):
        arr = a if isinstance(a, ndarray) else array(a)
        if arr.ndim != 2 or arr.shape[0] != arr.shape[1]:
            raise ValueError("Last 2 dimensions of the array must be square")
        return _LinalgModule._det_recursive(arr._data)

    @staticmethod
    def inv(a):
        arr = a if isinstance(a, ndarray) else array(a)
        if arr.ndim != 2 or arr.shape[0] != arr.shape[1]:
            raise ValueError("Last 2 dimensions of the array must be square")
        n = arr.shape[0]
        # Gauss-Jordan elimination
        aug = [
            [float(arr._data[r][c]) for c in range(n)] + [1.0 if r == c else 0.0 for c in range(n)]
            for r in range(n)
        ]
        for i in range(n):
            pivot = i
            for r in range(i + 1, n):
                if builtins_abs(aug[r][i]) > builtins_abs(aug[pivot][i]):
                    pivot = r
            aug[i], aug[pivot] = aug[pivot], aug[i]
            if builtins_abs(aug[i][i]) < 1e-12:
                raise ValueError("LinAlgError: Singular matrix")
            div = aug[i][i]
            for j in range(2 * n):
                aug[i][j] /= div
            for r in range(n):
                if r != i:
                    factor = aug[r][i]
                    for j in range(2 * n):
                        aug[r][j] -= factor * aug[i][j]
        inv_mat = [[aug[r][c + n] for c in range(n)] for r in range(n)]
        return ndarray(inv_mat, dtype_obj=float64)

    @staticmethod
    def solve(a, b):
        arr_a = a if isinstance(a, ndarray) else array(a)
        arr_b = b if isinstance(b, ndarray) else array(b)
        inv_a = _LinalgModule.inv(arr_a)
        return dot(inv_a, arr_b)

    @staticmethod
    def norm(x):
        arr = x if isinstance(x, ndarray) else array(x)
        flat = _flatten(arr._data)
        return math.sqrt(builtins_sum(float(v) ** 2 for v in flat))


linalg = _LinalgModule()
