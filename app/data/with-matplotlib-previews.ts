import { MATPLOTLIB_PREVIEWS } from "./matplotlib-previews";
import type { CodingChallenge, DocSection } from "./types";

export function withMatplotlibPreviews(doc: DocSection): DocSection {
  const withTarget = (challenge: CodingChallenge): CodingChallenge => ({
    ...challenge,
    expectedImages: MATPLOTLIB_PREVIEWS[challenge.id],
  });
  return {
    ...doc,
    examples: doc.examples.map(example => ({ ...example, previewImages: MATPLOTLIB_PREVIEWS[example.id] })),
    codingChallenges: doc.codingChallenges?.map(withTarget),
    caseStudies: doc.caseStudies?.map(withTarget),
  };
}
