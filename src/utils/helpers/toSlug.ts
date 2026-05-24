/**
 * Converts a Vietnamese (or any Unicode) string into a URL-safe ASCII slug.
 *
 * Strategy:
 * 1. Replace Vietnamese đ/Đ explicitly (it has no combining-diacritic decomposition)
 * 2. NFD-normalize: decomposes precomposed characters → base char + combining marks
 * 3. Strip combining diacritical marks (U+0300–U+036F)
 * 4. Lowercase, replace whitespace/special chars with hyphens
 * 5. Collapse consecutive hyphens, trim edges
 *
 * Example:
 *   "10 Ngày có thể nói 1000 câu tiếng Anh công sở (kèm CD)"
 *   → "10-ngay-co-the-noi-1000-cau-tieng-anh-cong-so-kem-cd"
 */
export function toSlug(text: string): string {
	return text
		.replace(/đ/g, "d")
		.replace(/Đ/g, "D")
		.normalize("NFD") // decompose accented chars → base + combining marks
		.replace(/[\u0300-\u036f]/g, "") // remove all combining diacritical marks
		.toLowerCase()
		.replace(/[^a-z0-9\s-]/g, "") // remove anything that's not alphanumeric/space/hyphen
		.trim()
		.replace(/\s+/g, "-") // spaces → hyphens
		.replace(/-+/g, "-") // collapse multiple consecutive hyphens
		.replace(/^-|-$/g, ""); // trim leading/trailing hyphens
}

/**
 * Builds the product URL slug: "{id}-{slugified-name}"
 * Matches the parser in ProductDetail: slug.split("-")[0] → productId
 */
export function toProductSlug(id: number, name: string): string {
	return `${id}-${toSlug(name)}`;
}
