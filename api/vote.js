import { kv } from '@vercel/kv';

const VOTE_KEY = 'votes_11sum_tokyo2026';

export async function GET() {
  const count = (await kv.get(VOTE_KEY)) || 0;
  return new Response(JSON.stringify({ count }), {
    status: 200,
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
  });
}

export async function POST() {
  const count = await kv.incr(VOTE_KEY);
  return new Response(JSON.stringify({ count }), {
    status: 200,
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
  });
}

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET,POST,OPTIONS' },
  });
}
