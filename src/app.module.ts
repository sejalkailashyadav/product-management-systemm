import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { AuthentationController } from './authentation/authentation.controller';
import { AuthentationService } from './authentation/authentation.service';

@Module({
  imports: [AuthModule],
  controllers: [AppController, AuthentationController],
  providers: [AppService, AuthentationService],
})
export class AppModule {}
