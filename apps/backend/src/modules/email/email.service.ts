import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MailerService } from '@nestjs-modules/mailer';
import { User } from '@prisma/client';
import { PrismaService } from '@/modules/prisma/prisma.service';
import { EMAIL_CONFIRM_SECRET } from '@/modules/email/constants';

@Injectable()
export class EmailService {
    constructor(
        private jwtService: JwtService,
        private prisma: PrismaService,
        private mailerService: MailerService,
    ) {}
    public async sendConfirmationLink(user: User): Promise<void> {
        const token = this.jwtService.sign(
            { sub: user.id },
            {
                secret: EMAIL_CONFIRM_SECRET,
                expiresIn: '1h',
            },
        );

        const url = `${process.env.API_URL}/auth/verify-email?token=${token}`;
        await this.mailerService.sendMail({
            to: user.email,
            subject: 'Подтверждение почты',
            html: `<a href="${url}">Подтвердить почту</a>`,
        });
    }

    public async verifyEmail(token: string): Promise<void> {
        const { sub: userId } = this.jwtService.verify<{ sub: number }>(token, {
            secret: EMAIL_CONFIRM_SECRET,
        });
        if (!userId) {
            throw new BadRequestException(`verify email with ${userId} denied`);
        }
        await this.prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                activated: true,
            },
        });
    }
}
