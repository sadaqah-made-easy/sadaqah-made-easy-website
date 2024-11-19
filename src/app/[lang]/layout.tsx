import TwSizeIndicator from "@/helpers/TwSizeIndicator";
import { getTranslations } from "@/lib/languageParser";
import Footer from "@/partials/Footer";
import Header from "@/partials/Header";
import Providers from "@/partials/Providers";
import "@/styles/main.scss";

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  const menu = await getTranslations(params.lang);

  return (
    <>
      <TwSizeIndicator />
      <Providers>
        <Header lang={params.lang} menu={menu} />
        <main>{children}</main>
        <Footer lang={params.lang} menu={menu} />
      </Providers>
    </>
  );
}
