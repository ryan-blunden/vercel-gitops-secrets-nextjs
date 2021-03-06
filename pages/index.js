import Head from 'next/head';
import styles from '../styles/Home.module.css'
import secrets from '../lib/secrets'

export default function Home({ welcomeMessage, secretsSize }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Vercel GitOps Secrets with Next.js</title>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Vercel GitOps Secrets with Next.js</h1>

        <p className={styles.description}>{welcomeMessage}</p>
        <p>Total secrets size: {secretsSize}KB</p>
      </main>

      <footer className={styles.footer}>
        Powered by the {" "}
        <a href="https://github.com/DopplerUniversity/gitops-secrets-nodejs">
          Node.js GitOps Secrets
        </a>{" "}
        package
      </footer>
    </div>
  );
}

// Test accessing secrets from a page
export async function getServerSideProps() {
  const appSecrets = secrets.fetch()
  const secretsSize = parseFloat(Buffer.byteLength(JSON.stringify(appSecrets), 'utf8') / 1024).toFixed(2)
  return {
    props: {
      welcomeMessage: appSecrets.WELCOME_MESSAGE,
      secretsSize: secretsSize
    },
  }
}
