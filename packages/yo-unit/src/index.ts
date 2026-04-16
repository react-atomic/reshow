import PATH from "path";
import { STRING } from "reshow-constant";

// for test
import YoTestLib from "yeoman-test";
import assert from "yeoman-assert";

interface YoTestOptions {
  source: string | { name: string };
  params?: Record<string, unknown>;
  options?: Record<string, unknown>;
  build?: (...args: unknown[]) => void;
}

const YoTest = ({ source, params, options = {}, build }: YoTestOptions) => {
  const isStringSource = STRING === typeof source;
  source = isStringSource ? PATH.join(source as string) : source;
  const sourceName = isStringSource ? source : (source as { name: string }).name;

  let chain = YoTestLib.create(source as string)
    .withPrompts(params)
    .withOptions(options)
    .inTmpDir((dir: string) => {
      console.log(`Build Dest on: ${dir}`);
      console.log(`Source : ${sourceName}`);
    });

  if (build) {
    chain = chain.build(build);
  }

  return chain.run();
};

export { YoTest, assert };
