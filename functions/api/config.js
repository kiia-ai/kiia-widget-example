export async function onRequestGet(context) {
  const widgetKey = context.env.KIIA_WIDGET_KEY || "";

  return Response.json({
    widgetKey,
  });
}
