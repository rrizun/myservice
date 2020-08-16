#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { MyserviceStack } from '../lib/myservice-stack';

const app = new cdk.App();
new MyserviceStack(app, 'MyserviceStack');
