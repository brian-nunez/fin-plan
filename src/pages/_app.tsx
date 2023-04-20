import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { appWithTranslation } from 'next-i18next'
import { useAutoAnimate } from '@formkit/auto-animate/react';
import nextI18NextConfig from '../../next-i18next.config';

import { trpc } from "../utils/trpc";

import "../styles/globals.css";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const [animateRef] = useAutoAnimate<HTMLDivElement>();

  return (
    <div ref={animateRef}>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </div>
  );
};

export default trpc.withTRPC(appWithTranslation(MyApp, nextI18NextConfig));
