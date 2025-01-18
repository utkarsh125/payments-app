import { Button } from "./button";

interface AppbarProps {
    user?: {
        email?: string | null;
    },
    // TODO: can u figure out what the type should be here?
    onSignin: any,
    onSignout: any
}

export const Appbar = ({
    user,
    onSignin,
    onSignout
}: AppbarProps) => {

    const upi = user?.email?.split(" ").join(" ")
    return <div className="flex justify-between items-center border-b px-4 border-slate-300">
        <div className="text-xl font-bold text-[#6151a6] flex flex-col justify-center">
            Payments.
        </div>
        <div className="font-semibold text-slate-500">
            ID: {upi}
        </div>
        <div className="flex flex-col justify-center pt-2">
            <Button onClick={user ? onSignout : onSignin}>{user ? "Logout" : "Login"}</Button>
        </div>
    </div>
}