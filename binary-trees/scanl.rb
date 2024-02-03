module Enumerable
  def self._scanl(enum, a, &f)
    Enumerator.new do |y|
      y << a
      loop { b = enum.next; y << (a = f.(a, b)) }
    end
  end

  def scanl(a, &f)
    Enumerable._scanl(each_entry, a, &f)
  end

  def scanl1(&f)
    enum = each_entry
    init = enum.next rescue return
    Enumerable._scanl(enum, init, &f)
  end

  def scanr(a, &f)
    Enumerable._scanl(each_entry.reverse_each, a, &f).reverse_each
  end

  def scanr1(&f)
    enum = each_entry.reverse_each
    init = enum.next rescue return
    Enumerable._scanl(enum, init, &f).reverse_each
  end
end
