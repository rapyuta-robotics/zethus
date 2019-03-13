/**
 * @author Garrett Johnson / http://gkjohnson.github.io/
 * https://github.com/gkjohnson/threejs-model-loader
 */

THREE.ModelLoader = function ( manager ) {

  this.manager = ( manager !== undefined ) ? manager : THREE.DefaultLoadingManager;

  this.cachedLoaders = {};
  this.loaderMap = {

    '3mf': '3MFLoader',
    'amf': 'AMFLoader',
    'bvh': 'BVHLoader',
    'assimp': 'AssimpLoader',
    'babylon': 'BabylonLoader',
    'dae': 'ColladaLoader',
    'drc': 'DRACOLoader',
    'fbx': 'FBXLoader',
    'gcode': 'GCodeLoader',
    'gltf': 'GLTFLoader',
    'glb': 'GLTFLoader',
    'kmz': 'KMZLoader',
    'md2': 'MD2Loader',
    'mmd': 'MMDLoader',
    'obj': 'OBJLoader',
    'ply': 'PLYLoader',
    'pcd': 'PCDLoader',
    'prwm': 'PRWMLoader',
    'stl': 'STLLoader',
    'tds': 'TDSLoader',
    'vtk': 'VTKLoader',
    'vtp': 'VTKLoader',
    'wrl': 'VRMLLoader',
    'x': 'XLoader',
    'zae': 'ColladaArchiveLoader',

  };

};

THREE.ModelLoader.prototype = {

  constructor: THREE.ColladaLoader,

  formResult: function ( res, extension ) {

    const mat = new THREE.MeshBasicMaterial( { color: 0xffffff } );
    let model = res.scene || res.object || res;
    model = model.isBufferGeometry || model.isGeometry ? new THREE.Mesh( model, mat ) : model;

    return {

      model,
      extension,
      originalResult: res

    };

  },

  getLoader: function ( loaderName, manager, loadercb ) {

    loadercb( new THREE[ loaderName ]( manager ) );

  },

  extToLoader: function ( ext, maanger, loadercb, onError ) {

    // Get the name of the loader we need
    ext = ext ? ext.toLowerCase() : null;
    var loaderName = this.loaderMap[ ext ] || null;
    if ( loaderName == null ) {

      onError( new Error( `Model Loader : No loader specified for '${ ext }' extension` ) );

      return;

    }

    // If the loader isn't already cached the lets load it
    var loader = this.cachedLoaders[ loaderName ] || null;

    if ( loader != null ) {

      loadercb( loader );

    } else {

      this.getLoader( loaderName, this.manager, loader => {

        this.cachedLoaders[ loaderName ] = loader;
        loadercb( loader );

      } );

    }

  },

  load: function ( url, onLoad, onProgress, onError, extOverride = null ) {

    onError = onError || ( e => console.error( e ) );

    // Get the extension associated the file so we can get the
    // appropriate loader
    var extMatches = url.match( /\.([^\.\/\\]+)$/ );
    var urlext = extMatches ? extMatches[ 1 ] : null;
    var ext = extOverride || urlext;

    if ( url == null ) {

      onError( new Error( 'Model Loader : No file extension found' ) );
      return;

    }

    this.extToLoader( ext, this.manager, loader => {

      // TODO: set the cross origin etc information
      loader.load( url, res => {

        onLoad( this.formResult( res ) );

      }, onProgress, onError );

    }, onError );

  },

  parse: function ( data, ext, onLoad, onError ) {

    onError = onError || ( e => console.error( e ) );

    this.extToLoader( ext, this.manager, loader => {

      onLoad( this.formResult( loader.parse( data ) ) );

    }, onError );

  }

};
