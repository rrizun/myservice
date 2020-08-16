#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { MyserviceStack } from '../lib/myservice-stack';

import * as codepipeline from '@aws-cdk/aws-codepipeline';
import * as codepipeline_actions from '@aws-cdk/aws-codepipeline-actions';
import { Construct, Stack, StackProps, SecretValue, Stage, StageProps } from '@aws-cdk/core';
import { CdkPipeline, SimpleSynthAction } from "@aws-cdk/pipelines";

export class CdkpipelinesDemoStage extends Stage {
    // public readonly urlOutput: CfnOutput;
    
    constructor(scope: Construct, id: string, props?: StageProps) {
      super(scope, id, props);
  
      const service = new MyserviceStack(this, 'Myservice');
      
    //   // Expose CdkpipelinesDemoStack's output one level higher
    //   this.urlOutput = service.urlOutput;
    }
}

export class CdkpipelinesDemoPipelineStack extends Stack {
    constructor(scope: Construct, id: string, props?: StackProps) {
      super(scope, id, props);
  
      const sourceArtifact = new codepipeline.Artifact();
      const cloudAssemblyArtifact = new codepipeline.Artifact();
   
      const pipeline = new CdkPipeline(this, 'Pipeline', {
        // The pipeline name
        pipelineName: 'MyServicePipeline',
        cloudAssemblyArtifact,
  
        // Where the source can be found
        sourceAction: new codepipeline_actions.GitHubSourceAction({
          actionName: 'GitHub',
          output: sourceArtifact,
          oauthToken: SecretValue.secretsManager('github-secret'),
          owner: 'rrizun',
          repo: 'myservice',
        }),
  
         // How it will be built and synthesized
         synthAction: SimpleSynthAction.standardNpmSynth({
           sourceArtifact,
           cloudAssemblyArtifact,
           
           // We need a build step to compile the TypeScript Lambda
        //    buildCommand: 'npm run build'
         }),
      });
  
      // This is where we add the application stages
      // ...
    }
  }
  
const app = new cdk.App();
new CdkpipelinesDemoPipelineStack(app, 'CdkpipelinesDemoPipelineStack', {
    env: { account: '343892718819', region: 'us-east-1' },
  });
  