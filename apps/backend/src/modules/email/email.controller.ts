import { Controller, Get, HttpCode, HttpStatus, Query, Req } from '@nestjs/common';
import { EmailService } from '@/modules/email/email.service';
import { API_ROUTES } from '@feed/shared/api';

@Controller()
export class EmailController {
    constructor(private readonly emailService: EmailService) {}

    @HttpCode(HttpStatus.OK)
    @Get(API_ROUTES.EMAIL_CONFIRM.SEND)
    public async sendEmail(@Req() req): Promise<void> {
        await this.emailService.sendConfirmationLink(req.user.id);
    }

    @HttpCode(HttpStatus.OK)
    @Get(API_ROUTES.EMAIL_CONFIRM.VERIFY)
    public async verify(@Query('token') token: string): Promise<void> {
        await this.emailService.verifyEmail(token);
    }
}
