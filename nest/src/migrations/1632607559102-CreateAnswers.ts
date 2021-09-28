import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateAnswers1632607559102 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'answers',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'challenge_id',
            isNullable: false,
            type: 'uuid',
          },
          {
            name: 'repository_url',
            isNullable: false,
            type: 'varchar',
          },
          {
            name: 'status',
            isNullable: false,
            type: 'varchar',
          },
          {
            name: 'grade',
            isNullable: true,
            default: null,
            type: 'smallint',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('answers');
  }
}
