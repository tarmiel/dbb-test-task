export async function deleteForm(id: string): Promise<{ success?: boolean; error?: string }> {
  const res = await fetch(`/api/forms/${id}`, {
    method: 'DELETE'
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    return { error: err.error ?? 'Failed to delete form' };
  }

  return { success: true };
}
