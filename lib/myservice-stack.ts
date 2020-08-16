import * as cdk from '@aws-cdk/core';
import * as sns from '@aws-cdk/aws-sns';

export class MyserviceStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    new sns.Topic(this, "Topic")
  }
}
