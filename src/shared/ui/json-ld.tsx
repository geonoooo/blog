/**
 * JSON-LD를 <script>로 심는다.
 * 값에 섞인 `</script>`가 태그를 먼저 닫아버리지 않도록 `<`를 유니코드로 이스케이프한다.
 */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replaceAll("<", "\\u003c") }}
    />
  );
}
