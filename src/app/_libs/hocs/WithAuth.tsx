export default function withAuth<P extends object>(
  WrappedComponent: React.ComponentType<P>,
) {
  async function WithTooltip(props: P) {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return <Auth />;
  }
}
