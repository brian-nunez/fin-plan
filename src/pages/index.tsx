import { type NextPage } from "next";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { NextSeo } from "next-seo";
import nextI18NextConfig from '../../next-i18next.config';

import seo from '../utils/seo';
import { CompoundInterestCalculator } from "../components/calculators/compound-interest";
import { PrincipalBasedOnAccrued } from "../components/calculators/principal-based-on-accrued";
import { PrincipalBasedOnInterestAccrued } from "../components/calculators/principal-based-on-interest-accrued";
import { InterestRateBasedOnAccruedAndPrincipal } from "../components/calculators/interest-rate-based-on-accrued-and-principal";

const Home: NextPage = () => {
  return (
    <>
      <NextSeo
        title={seo.titles.home}
        description={seo.descriptions.home}
        additionalLinkTags={seo.linkTags.home}
        additionalMetaTags={seo.metaTags.home}
      />
      <main className="container mx-auto">
        <div className="mx-auto mt-12 grid grid-cols-1 gap-">
          <CompoundInterestCalculator />
          <PrincipalBasedOnAccrued />
          <PrincipalBasedOnInterestAccrued />
          <InterestRateBasedOnAccruedAndPrincipal />
        </div>
      </main>
    </>
  );
};

export async function getStaticProps({ locale }: { locale: string; }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'], nextI18NextConfig, ['en-US'])),
    },
  };
}

export default Home;
