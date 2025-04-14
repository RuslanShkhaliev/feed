import { PrismaClient } from '@prisma/client';

export class TestPrismaService extends PrismaClient {
    public async resetDatabase() {
        await this.$transaction([
            this.user.deleteMany(),
            this.post.deleteMany(),
            this.friendship.deleteMany(),
        ]);
    }
}
