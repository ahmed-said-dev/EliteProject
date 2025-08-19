// pages/test-products.js
import { gql, useQuery } from '@apollo/client';

const GET_PRODUCTS = gql`
  query ($channel: String!) {
    products(first: 6, channel: $channel) {
      edges { node { id name thumbnail { url } } }
    }
  }
`;

export default function TestProducts() {
  const { data, loading, error } = useQuery(GET_PRODUCTS, {
    variables: { channel: process.env.NEXT_PUBLIC_SALEOR_CHANNEL },
  });

  if (loading) return <p>تحميل…</p>;
  if (error)   return <p>خطأ: {error.message}</p>;

  return (
    <div style={{display:'flex',gap:20,flexWrap:'wrap'}}>
      {data.products.edges.map(({ node }) => (
        <div key={node.id} style={{border:'1px solid #ccc',padding:10}}>
          <img src={node.thumbnail?.url} width={160} />
          <h4>{node.name}</h4>
        </div>
      ))}
    </div>
  );
}