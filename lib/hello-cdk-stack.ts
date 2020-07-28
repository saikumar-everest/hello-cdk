import * as cdk from '@aws-cdk/core';
import * as widgetService from './widget-service';
import { RdsService } from './rds-stack';

export class HelloCdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    // new widgetService.WidgetService(this, 'Widgets');
    new RdsService(scope, 'RDS instance');
  }
}
