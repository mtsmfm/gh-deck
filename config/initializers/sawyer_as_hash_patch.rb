Sawyer::Resource.prepend(Module.new do
  def as_json(options)
    to_hash.as_json(options)
  end
end)
