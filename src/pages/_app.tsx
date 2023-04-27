import { type AppType } from "next/dist/shared/lib/utils";
import { SessionProvider } from "next-auth/react";
import "y/styles/globals.scss";

const MyApp: AppType = ({
  Component,
  //@ts-ignore
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
};

export default MyApp;
