import { Module } from '@nestjs/common';
import { ModelDefinition, MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    // forRootAsync dememizin nedeni nest'e Bu module'ün initialize olması için başka module'lere ihtiyacımız olduğunu söylememiz için
    MongooseModule.forRootAsync({
      // imports: [ConfigModule],
      //Use Factory sayesinde Bu işi nasıl yapacağını söylüyoruz. ConfigService'i inject etmesi gerektiğini anlatacağız
      // @ts-ignore
      useFactory: (configService: ConfigService) => ({
        uri: configService.get('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {
  static forFeature(models: ModelDefinition[]) {
    return MongooseModule.forFeature(models);
  }
}
