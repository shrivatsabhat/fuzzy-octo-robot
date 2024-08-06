export function getDomainFromUrl(url: string): string | null {
  try {
    // Create a new URL object
    const urlObject = new URL(url);

    // Extract the hostname (domain)
    return urlObject.hostname;
  } catch (error) {
    console.error('Invalid URL', error);
    return null;
  }
}