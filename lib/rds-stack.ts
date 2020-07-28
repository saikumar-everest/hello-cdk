import * as core from "@aws-cdk/core";
import { Secret } from "@aws-cdk/aws-secretsmanager";
import { DatabaseInstance, DatabaseInstanceEngine, StorageType } from "@aws-cdk/aws-rds";
import { InstanceSize, InstanceType, Vpc, SubnetType, InstanceClass } from "@aws-cdk/aws-ec2";
import { Duration } from "@aws-cdk/core";

export class RdsService extends core.Construct {
  constructor(scope: core.Construct, id: string) {
    super(scope, id);

    const vpc = new Vpc(this, 'rdsVpc', {
        cidr: "10.0.0.0/16"
     });
    const secret = Secret.fromSecretAttributes(this, "SamplePassword", {
      secretArn:
        "arn:aws:secretsmanager:{region}:{organisation-id}:secret:ImportedSecret-sample",
    });

    new DatabaseInstance(this, "mysql-rds-instance", {
      engine: DatabaseInstanceEngine.MYSQL,
      instanceType: InstanceType.of(InstanceClass.T2, InstanceSize.SMALL),
      vpc,
      vpcPlacement: { subnetType: SubnetType.ISOLATED },
      storageEncrypted: true,
      multiAz: false,
      autoMinorVersionUpgrade: false,
      allocatedStorage: 25,
      storageType: StorageType.GP2,
      backupRetention: Duration.days(3),
      deletionProtection: false,
      masterUsername: "saikumar123",
      databaseName: "Organization",
      masterUserPassword: secret.secretValue,
      port: 3306,
    });
  }
}
