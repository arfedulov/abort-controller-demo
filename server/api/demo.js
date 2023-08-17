
export default defineEventHandler(async () => {
        await new Promise((done) => setTimeout(done, 1000));

        return { ok: true };
})
