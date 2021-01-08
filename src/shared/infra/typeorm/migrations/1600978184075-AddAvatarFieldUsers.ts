import {
  MigrationInterface, QueryRunner, TableColumn, AdvancedConsoleLogger,
} from 'typeorm';

export default class AddAvatarFieldUsers1600978184075 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn('users', new TableColumn({
      name: 'avatar',
      type: 'varchar',
      isNullable: true,
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'avatar');
  }
}
