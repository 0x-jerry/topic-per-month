// * 


var fs = require( "fs" );
var path = require( "path" );

var list = [];
function listFile( dir ) {
	var arr = fs.readdirSync( dir );
	arr.forEach( function ( item ) {
		var fullpath = path.join( dir, item );
		var stats = fs.statSync( fullpath );
		if ( stats.isDirectory() ) {
			listFile( fullpath );
		} else {
			fullpath.endsWith( '.md' ) && list.push( {
				fullpath,
				fileName: item
			} );
		}
	} );
	return list;
}

function pickFileInfo( content ) {
	try {
		let reg = new RegExp( /^---\n((.+\n)*)---\n/ )
		let matchArr = reg.exec( content );
		let res = {};
		if ( matchArr && matchArr[ 1 ] ) {
			matchArr[ 1 ].split( '\n' ).forEach( item => {
				let arr = item.split( ':' );
				if ( arr[ 0 ] ) {
					res[ arr[ 0 ] ] = arr[ 1 ].trim();
				}
			} );
			return res;
		}
	} catch ( error ) {
		console.log( '解析失败' );
		throw new Error( error )
	}
}

let files = listFile( path.resolve( __dirname, "../docs" ) );

let resultList = [];

files.forEach( file => {
	let info = pickFileInfo( fs.readFileSync( file.fullpath, { encoding: 'utf8' } ) )
	if ( info && info.visible == 'true' ) {
		resultList.push( {
			path: file.fullpath,
			name: file.fileName,
			title: info.title || '',
			date: info.date || '',
			tags: info.tags,
		} )
	}
} )



let writeContent = `# 每月一题
每月根据一个主题，撰写一篇文章
`;

function writeFile( file ) {
	const githubUrlPrefix = 'https://github.com/cwxyz007/topic-per-month/blob/main/docs/';
	let topicUrl = githubUrlPrefix + file.path.split( 'docs/' )[ 1 ];
	writeContent += `\n ### [${ file.title }](${ topicUrl })`;

}

console.log( resultList );
resultList.forEach( result => {
	writeFile( result );
} );

fs.writeFileSync( 'README.md', writeContent, {}, ( err, data ) => {
	console.err( err, data );
} );