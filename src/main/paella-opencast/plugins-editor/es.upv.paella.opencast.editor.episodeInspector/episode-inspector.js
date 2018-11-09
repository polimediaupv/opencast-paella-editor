(function() {
	
	let app = angular.module(paella.editor.APP_NAME);

	app.directive("episodeInspector",function() {
		return {
			restrict: "E",
			templateUrl:"templates/es.upv.paella.opencast.editor.episodeInspector/episode-inspector.html",
			controller:["$scope","PaellaEditor",function($scope,PaellaEditor) {
				$scope.loading = true;
				$scope.videoTracks = [];
				
				paella.opencast.getEpisode().then((ep)=>{
					$scope.$apply(function () {
						$scope.mediapackage = ep.mediapackage
						
						if ((ep.mediapackage) && (ep.mediapackage.media) && (ep.mediapackage.media.track)) {
							if (!Array.isArray(ep.mediapackage.media.track)) {
								ep.mediapackage.media.track = [ep.mediapackage.media.track];
							}
						}
						$scope.loading = false;
					});				
				});
			}]
		}
	});

	class EpisodeInspectorPlugin extends paella.editor.SideBarPlugin {
		isEnabled() {
			return Promise.resolve(true);
		}


		isVisible(PaellaEditor,PluginManager) {
			return paella.opencast.getEpisode();
		}

		getName() {
			return "episodeInspectorSidebar";
		}

		getTabName() {
			return "Episode inspector";
		}

		getDirectiveName() {
			return "episode-inspector";
		}
	}


	paella.editor.addPlugin(() => {
		return EpisodeInspectorPlugin;
	});
})();