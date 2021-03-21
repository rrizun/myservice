#!/bin/sh -ex
# https://aws.amazon.com/blogs/developer/cdk-pipelines-continuous-delivery-for-aws-cdk-applications/
npm run build # If necessary, to recompile the Lambda sources
npx cdk synth
npx cdk -a cdk.out/assembly-Dev "$@"
