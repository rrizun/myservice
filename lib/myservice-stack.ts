import * as cdk from '@aws-cdk/core';
import * as sns from '@aws-cdk/aws-sns';
import { CfnOutput } from '@aws-cdk/core';

export class MyserviceStack extends cdk.Stack {

  public readonly urlOutput: CfnOutput;

  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    const topic = new sns.Topic(this, "Topic")

    this.urlOutput = new CfnOutput(this, 'TopicArnOutput', {
      value: topic.topicArn,
    });

  }
}
