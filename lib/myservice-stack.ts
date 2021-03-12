import * as cdk from '@aws-cdk/core';
import * as sns from '@aws-cdk/aws-sns';
import * as sqs from '@aws-cdk/aws-sqs';
import * as subscriptions from '@aws-cdk/aws-sns-subscriptions';
import { CfnOutput } from '@aws-cdk/core';

export class MyserviceStack extends cdk.Stack {

  public readonly urlOutput: CfnOutput;

  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    const myTopic = new sns.Topic(this, "MyTopic")
    const myQueue = new sqs.Queue(this, "MyQueue");
    myTopic.addSubscription(new subscriptions.SqsSubscription(myQueue));

    this.urlOutput = new CfnOutput(this, 'myTopicArn', {
      value: myTopic.topicArn,
    });

  }
}
