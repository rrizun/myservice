import * as cdk from '@aws-cdk/core';
import * as ec2 from '@aws-cdk/aws-ec2';
import * as iam from '@aws-cdk/aws-iam';
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

    // this.doCompute();

    this.urlOutput = new CfnOutput(this, 'myQueueUrl', {
      value: myQueue.queueUrl,
    });

  }

  private doCompute() {
    const vpc = new ec2.Vpc(this, "MyVpc", { maxAzs: 1 })
    // const instanceType = ec2.InstanceType.of(ec2.InstanceClass.STANDARD5, ec2.InstanceSize.LARGE);
    const host = new ec2.BastionHostLinux(this, 'BastionHost', { vpc, instanceType: new ec2.InstanceType("m5.8xlarge") });

    const powerUserAccess = iam.ManagedPolicy.fromManagedPolicyArn(this, "PowerUserAccess", "arn:aws:iam::aws:policy/PowerUserAccess")
    host.role.addManagedPolicy(powerUserAccess)
  }
}
