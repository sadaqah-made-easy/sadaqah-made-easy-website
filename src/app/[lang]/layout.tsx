import TwSizeIndicator from "@/helpers/TwSizeIndicator";
import Providers from "@/partials/Providers";
import "@/styles/main.scss";

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {

  return (
    <>
      <TwSizeIndicator />
      <Providers>
        <main>{children}</main>
      </Providers>
    </>
  );
}
