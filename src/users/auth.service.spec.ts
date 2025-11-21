import { Test } from "@nestjs/testing";
import { AuthService } from "./auth.service";
import { UsersService } from "./users.service";
import { User } from "./users.entity";

describe("Auth Service", () => {
    let service: AuthService

    beforeEach(async () => {
        const fakeUserService: Partial<UsersService> = {
            find: () => Promise.resolve([]),
            findByEmail: (email: string) => Promise.resolve(null),
            create: (email: string, password: string) => Promise.resolve({ id: 1, email, password } as User)
        }

        const module = await Test.createTestingModule({
            providers: [
                AuthService,
                {
                    provide: UsersService,
                    useValue: fakeUserService
                }
            ]
        }).compile()

        service = module.get(AuthService)
    })

    it("it can create an instance of auth service", () => {
        expect(service).toBeDefined()
    })

    it("create a new user with a salted and hashed password", async () => {
        const user = await service.signUpUser("test12@gmail.com", "testpassword")
        expect(user.password).not.toEqual("testpassword")
    })

})