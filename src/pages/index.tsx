import { type NextPage } from "next";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { NextSeo } from "next-seo";
import { useTranslation } from 'next-i18next';
import nextI18NextConfig from '../../next-i18next.config';

import seo from '../utils/seo';
import { CompoundCalculator } from "../components/calculators/compound-interest";

const Home: NextPage = () => {
  const { t } = useTranslation();

  return (
    <>
      <NextSeo
        title={seo.titles.home}
        description={seo.descriptions.home}
        additionalLinkTags={seo.linkTags.home}
        additionalMetaTags={seo.metaTags.home}
      />
      <main className="container mx-auto">
        <div className="mx-auto mt-12 w-fit">
          <CompoundCalculator />
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
