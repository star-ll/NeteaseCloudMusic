export function PreviewImage(prop) {
	function preview() {}

	return (
		<>
			<div className={prop.className || ""} style={prop.style || {}}>
				{prop.children}
			</div>
		</>
	);
}
