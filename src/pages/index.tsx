import Head from 'next/head'

import { GetStaticProps } from 'next'
import Image from 'next/image'

import { SubscribeButton } from '../components/SubscribeButton'
import { stripe } from '../services/stripe'
import profilePic from '../../public/images/avatar.svg'

import styles from './home.module.scss'

interface HomeProps {
  product: {
    priceId: string;
    amount: string;
  }
}

export default function Home({product}) {
  return (
    <>
      <Head>
        <title>Início | ig.news</title>
      </Head>

      <main className={styles.contentContainer}>
        <section className={styles.hero}>

          <span>🙌 Hey, welcome</span>

          <h1>News about the <span>React</span> world.</h1>

          <p>
            Get access to all the publications <br />
            <span>for {product.amount} month</span>
          </p>

          <SubscribeButton/>

        </section>

        <Image src={profilePic} alt="Girl coding"/>
      </main>

    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve('price_1JF1oeIO0twQJNSo3Xgwkmw4')

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat('en-US', {
      style:'currency',
      currency: 'USD',
    }).format(price.unit_amount / 100),
  }

  return {
    props: {
      product,
    },
    revalidate: 60 * 60 *24, //24 hours
  }
}
