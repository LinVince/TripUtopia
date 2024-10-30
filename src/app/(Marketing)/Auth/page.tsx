import { auth, signIn, signOut } from "@/auth";
import Image from "next/image";

export default async function Auth() {
  const session = await auth();
  const username = session?.user?.name;
  console.log(session?.user);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md text-center">
        <h1 className="text-3xl font-bold mb-4">
          {username ? "Welcome back!" : "Welcome"}
        </h1>
        <p className="text-gray-600 mb-6">
          {username
            ? `You are signed in as ${username}`
            : "Please sign in to continue."}
        </p>
        <div className="my-4 flex justify-center">
          {username ? (
            <form
              action={async () => {
                "use server";
                await signOut();
              }}
            >
              <button
                type="submit"
                className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600"
              >
                Sign Out
              </button>
            </form>
          ) : (
            <form
              action={async () => {
                "use server";
                await signIn("google", { redirectTo: "/" });
              }}
            >
              <button
                type="submit"
                className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 flex items-center justify-center"
              >
                <Image
                  src="/google.png"
                  alt="Google"
                  width={24}
                  height={24}
                  className="mr-2"
                />
                Sign in with Google
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
