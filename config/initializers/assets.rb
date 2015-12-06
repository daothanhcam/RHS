Rails.application.config.assets.version = '1.0'

# Add additional assets to the asset load path
# Rails.application.config.assets.paths << Emoji.images_path

# Precompile additional assets.
# application.js, application.css, and all non-JS/CSS in app/assets folder are already added.
Rails.application.config.assets.precompile += %w( maps.js )
Rails.application.config.assets.precompile += %w(custom_websocket.js)
Rails.application.config.assets.precompile += %w( arrows-ffffff.png )
Rails.application.config.assets.precompile += %w( search_map.js )