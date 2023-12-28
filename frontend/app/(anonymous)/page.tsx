import { ActiveLink } from "@local/active-link";

export default function Homepage() {
  return (
    <div className="flex-grow flex flex-col">
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Welcome to Tails!</h2>
              <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Tails is your go-to app for saving and discovering great cocktail recipes. Explore, save your favorites,
                and share with friends.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <ActiveLink href="/enter">Login / Signup</ActiveLink>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">App Features</div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Explore, Save, and Share</h2>
              <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                With Tails, you can explore a wide range of cocktail recipes from all over the world, save your
                favorites for easy access later, and share your discoveries with your friends.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
