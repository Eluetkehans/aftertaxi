import { Router } from "express"

const router = Router()

router.get("/initial", () => console.log("hit"))

export {
    router
}