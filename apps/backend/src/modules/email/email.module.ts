import { Module } from '@nestjs/common';
import { EmailService } from '@/modules/email/email.service';
import { EmailController } from '@/modules/email/email.controller';
import { PrismaModule } from '@/modules/prisma';
import { MailerModule } from '@nestjs-modules/mailer';
import { PrismaService } from '@/modules/prisma/prisma.service';

@Module({
    imports: [
        PrismaModule,
        MailerModule.forRoot({
            transport: {
                host: 'smtp.mail.ru',
                port: 465,
                secure: true,
                auth: {
                    user: 'morehome@mail.ru',
                    pass: 'yourPassword',
                },
            },
            defaults: {
                from: '"Feed" <support@feed.social>',
            },
        }),
    ],
    providers: [EmailService, PrismaService],
    controllers: [EmailController],
})
export class EmailModule {}
