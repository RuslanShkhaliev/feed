import { z } from 'zod';
export const AuthCredentialsSchema = z.object({
    email: z.string().email(),
    password: z.string().min(3, 'Пароль должен быть минимум 3 символа'),
});
//# sourceMappingURL=auth.js.map