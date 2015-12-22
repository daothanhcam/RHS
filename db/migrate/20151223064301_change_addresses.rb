class ChangeAddresses < ActiveRecord::Migration
  def change
  	remove_column :addresses, :capacity
  	remove_column :addresses, :region_id
  	remove_column :addresses, :parking
  	remove_column :addresses, :air_conditioner
  	remove_column :addresses, :ceiling_fan
  	remove_column :addresses, :bed
  	remove_column :addresses, :washing_machine
  	remove_column :addresses, :television
  	remove_column :addresses, :network
  	remove_column :addresses, :table
  	remove_column :addresses, :chair
  	remove_column :addresses, :type
  end
end
