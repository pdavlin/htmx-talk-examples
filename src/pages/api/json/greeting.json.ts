export function GET({ params, request }) {
  return new Response(
    JSON.stringify({
      greeting: "Ahoy-hoy!",
    }),
  );
}
