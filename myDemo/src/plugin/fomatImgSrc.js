// 格式化图片地址
function formatImgSrc(hash,size,auto){
	
	if(!hash)return '';
	hash = hash.replace(/^(.{1})(.{2})(.+(jpeg|png))$/g,'$1/$2/$3.$4');
	size = size || 90;
	size = auto?size:size+'x'+size;
	return auto?`//fuss10.elemecdn.com/${hash}?imageMogr/format/webp/thumbnail/${size}x/`:
	`//fuss10.elemecdn.com/${hash}?imageMogr/format/webp/thumbnail/!${size}r/gravity/Center/crop/${size}/`;
}

export default formatImgSrc;