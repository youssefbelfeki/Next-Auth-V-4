import { auth as middleware } from "@/auth"

export default middleware((req) =>{
    console.log("middelware called for: ", req.nextUrl.pathname)
})

export const config = {
    matcher: ["/login"]
}